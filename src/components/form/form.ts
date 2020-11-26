import Block from "../../modules/block";
import {IEvent} from "../../modules/validation/validation";
import FormValidation from "../../modules/validation/formValidation";

export default class Form extends Block {
    props: any;
    _element: Element;
    fields: string;
    buttons: string;

    constructor(props: Record<string, unknown>, fields: string, buttons: string) {
        super("div", props);
        this.fields = fields;
        this.buttons = buttons;
    }

    initEvents(block: Block): void {
        if (block._element) {
            const validation = new FormValidation(this.props);
            block._element.onsubmit = (e: IEvent) => {
                const validResult = validation.validate(e);
                if (validResult && this.props.actions) {
                    this.props.actions.submit();
                }
            };
        }
    }

    getTemplate(): string {
        return '<form class="{{formClassName}}">\n' +
                        this.fields +
            '        <div class="{{buttonsClassName}}">\n' +
                        this.buttons +
            '        </div>\n' +
            '    </form>';
    }
}