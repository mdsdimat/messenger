import Block from "modules/Block";
import {IEvent, IField} from "modules/validation/Validation";
import FormValidation from "modules/validation/FormValidation";

export default class Form extends Block {
    props: {
        fields: IField[],
        validation?: [],
        actions: {
            submit: () => void
        }
    };
    _element: Element;
    fields: string;
    buttons: string;

    constructor(props: Record<string, unknown>, fields: string, buttons: string) {
        super("div", props);
        this.fields = fields;
        this.buttons = buttons;
    }

    handleSubmit = (e: IEvent): void => {
        const validation = new FormValidation(this.props);
        const validResult = validation.validate(e);
        if (validResult && this.props.actions) {
            this.props.actions.submit();
        }
    }

    initEvents(block: Block): void {
        if (block._element) {
            block._element.addEventListener('submit', this.handleSubmit);
        }
    }

    getTemplate(): string {
        return `<form class="{{formClassName}}">
                        ${this.fields}
                    <div class="{{buttonsClassName}}">
                        ${this.buttons}
                    </div>
                </form>`;
    }
}