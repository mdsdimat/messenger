import Block from "../../modules/block";
import {IEvent, IField} from "../../modules/validation/validation";
import InputValidation from "../../modules/validation/inputValidation";

export default class Input extends Block {
    props: {
        fields: IField[],
        validation?: [],
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    initEvents(block: Block): void {
        if (block._element) {
            const validation = new InputValidation(this.props);
            block._element.firstChild.onfocus = (e: IEvent) => {validation.validate(e)};
            block._element.firstChild.onblur = (e: IEvent) => {validation.validate(e)};
        }
    }

    getTemplate(): string {
        return '<input name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">';
    }
}