/// <reference path="../../globals.d.ts" />
import EventBus from "./event-bus.js";
abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    _element:any = null;
    _meta: {tagName: string, props: {}|null};
    private readonly _id: string;
    private eventBus: () => EventBus;
    static _instances: Block[];
    static hydrate: () => void;
    props: {[key: string]: unknown};

    protected constructor(tagName:string = "div", props:{} = {}) {
        this._id = 'uniq' + parseInt(String(Math.random() * 1000000));
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
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
    }

    _componentDidUpdate = (oldProps: {}, newProps: {}): void => {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response && {...oldProps} !== {...newProps}) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: {}, newProps: {}) {
        if (oldProps && newProps) {
            return true;
        }
    }

    initEvents(block: Block): void {
        if (block) {
            return;
        }
    }

    setProps = (nextProps: {}) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    getId() {
        return this._id;
    }

    get element() {
        return this._element;
    }

    _render = () => {
        const block = this.render();
        this._element.innerHTML = block;
    }

    renderToString() {
        const wrapper = document.createElement('div');
        this._element.innerHTML = this.render();
        wrapper.appendChild(this._element);
        return wrapper.innerHTML;
    }

    setElement(element:HTMLElement) {
        this._element = element;
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return Handlebars.compile(this.getTemplate())(this.props);
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: {[key:string]: unknown}) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
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

    _createDocumentElement(tagName:string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }

    abstract getTemplate():string
}

Block._instances = [];
Block.hydrate = function() {
    for (const i of this._instances) {
        i.setElement(document.querySelector(`[_key=${i.getId()}`));
        i.initEvents(i);

    }
}

export default Block;