import EventBus from "./event-bus.js";
abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    _element:any = null;
    _meta: {}|null;
    private _id: string;
    private eventBus: () => EventBus;
    static _instances: any;
    static hydrate: () => void;
    props: any;

    /** JSDoc
     *
     * @returns {void}
     */
    constructor(tagName:string|null = "div", props:{}|null = {}) {
        this._id = 'uniq' + parseInt(String(Math.random() * 1000000));
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
        eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);

        Block._instances.push(this);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        // @ts-ignore
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this._element.setAttribute('_key', this.getId());
    }

    _componentDidMount(oldProps: {}) {
        this.componentDidMount(oldProps);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)

    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: {}) {
        return oldProps;
    }

    _componentDidUpdate(oldProps: {}, newProps: {}) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (oldProps === newProps) {
            if (response) {
                this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            }
        } else {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: {}, newProps: {}) {
        if (oldProps && newProps) {
            return true;
        }
    }

    initEvents(block:any) {
        return block;
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

    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
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

    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        return new Proxy(props, {
            set(target, prop, value) {
                const oldProp = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, target);
                return true;
            },
            get(target, prop) {
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