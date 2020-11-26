import EventBus from "./event-bus";
import {render} from "./scripts";
import Handlebars from 'handlebars';
abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    _element:any = null;
    _meta: {tagName: string, props: Record<string, unknown>|null};
    private readonly _id: string;
    private eventBus: () => EventBus;
    static _instances: Block[];
    static hydrate: () => void;
    props: Record<string, unknown>;
    saveContent: Element|null;
    static blockId: number;

    protected constructor(tagName = "div", props:Record<string, unknown> = {}) {
        this._id = 'uniq' + parseInt(String(Block.blockId++));
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents();
        this.eventBus().emit(Block.EVENTS.INIT);
        this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
        this.saveContent = null;

        Block._instances.push(this);
    }

    _registerEvents(): void {
        this.eventBus().on(Block.EVENTS.INIT, this.init);
        this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount);
        this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render);
        this.eventBus().on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate);
    }

    _createResources(): void {
        const tagName = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    }

    init = (): void => {
        this._createResources();
        this._element.setAttribute('_key', this.getId());
    }

    _componentDidMount = (): void => {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(): void {
        return;
    }

    _componentDidUpdate = (oldProps: Record<string, unknown>, newProps: Record<string, unknown>): void => {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response && {...oldProps} !== {...newProps}) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            Block.hydrate()
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean|undefined {
        if (oldProps && newProps) {
            return true;
        }
    }

    initEvents(block: Block): void {
        if (block) {
            return;
        }
    }

    setProps = (nextProps: Record<string, unknown>): undefined => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    getId(): string {
        return this._id;
    }

    get element(): Element {
        return this._element;
    }

    _render = (): void => {
        const block = this.render();
        if (this._element) {
            this._element.innerHTML = block;
        }
    }

    renderToString(): string {
        const wrapper = document.createElement('div');
        this._element.innerHTML = this.render();
        wrapper.appendChild(this._element);
        return wrapper.innerHTML;
    }

    setElement(element:HTMLElement): void {
        this._element = element;
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return Handlebars.compile(this.getTemplate())(this.props);
    }

    getContent(): Element {
        return this.element;
    }

    _makePropsProxy(props: {[key:string]: unknown}): Record<string, unknown> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return new Proxy(props, {
            set(target: {[key:string]: unknown}, prop: string, value) {
                const oldProp = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, target);
                return true;
            },
            get(target: {[key:string]: unknown}, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            }
        });
    }

    _createDocumentElement(tagName:string): Element {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show(selector: string): void {
        this._element = this.saveContent;
        render(selector, this);
    }

    hide(): void {
        this.saveContent = this.getContent();
        const element = document.querySelector(`[_key=${this.getId()}`);
        if (element !== null) {
            element.remove();
        }
    }

    abstract getTemplate():string
}

Block.blockId = 0;
Block._instances = [];
Block.hydrate = function() {
    for (const i of this._instances) {
        i.setElement(document.querySelector(`[_key=${i.getId()}`));
        i.initEvents(i);
    }
}

export default Block;