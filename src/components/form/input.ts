import InputValidation from "modules/validation/InputValidation";
import Block from "modules/Block";
import {IEvent, IField} from "modules/validation/Validation";


export default class Input extends Block {
    props: {
        fields: IField[],
        validation?: [],
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    handleFocus = (e: IEvent): void => {
        const validation = new InputValidation(this.props);
        validation.validate(e)
    }

    initEvents(block: Block): void {
        if (block._element) {
            block._element.addEventListener('focus', this.handleFocus);
            block._element.addEventListener('blur', this.handleFocus);
        }
    }

    getTemplate(): string {
        return `<input id="{{id}}" name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">`;
    }
}