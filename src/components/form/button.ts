import Block from "modules/Block";
import {IEvent} from "modules/validation/Validation";

export default class Button extends Block {
    props: {
        action?: () => Record<string, unknown>
    }

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    handleClick = (e: IEvent): void => {
        e.preventDefault();
        if (this.props.action) {
            this.props.action()
        }
    }

    initEvents(block: Block): void {
        if (block._element && this.props.action) {
            block._element.addEventListener('click', this.handleClick);
        }
    }

    getTemplate(): string {
        return `<button type="{{type}}" class="{{className}}">{{text}}</button>`;
    }
}