import Block from "../../modules/block";
import {IEvent} from "../../modules/validation/validation";

export default class Button extends Block {
    props: {
        action?: () => Record<string, unknown>
    }

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    initEvents(block: Block) {
        if (block._element && this.props.action) {
            block._element.onclick = (e: IEvent) => {
                e.preventDefault();
                if (this.props.action) {
                    this.props.action()
                }
            };
        }
    }

    getTemplate(): string {
        return '<button type="{{type}}" class="{{className}}">{{text}}</button>';
    }
}