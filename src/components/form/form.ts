/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import {IEvent} from "../../modules/validation/validation.js";
import FormValidation from "../../modules/validation/formValidation.js";

export default class Form extends Block {
    props: any;
    _element: Element;
    fields: string;
    buttons: string;

    constructor(props: {}, fields: string, buttons: string) {
        super("div", props);
        this.fields = fields;
        this.buttons = buttons;
    }

    initEvents(block: Block) {
        if (block._element) {
            const validation = new FormValidation(this.props);
            block._element.onsubmit = (e: IEvent) => {
                console.log(this.props)
                const validResult = validation.validate(e);
                if (validResult) {
                    this.props.actions.submit();
                }
            };
        }
    }

    getTemplate() {
        return '<form class="{{formClassName}}">\n' +
                        this.fields +
            '        <div class="{{buttonsClassName}}">\n' +
                        this.buttons +
            '        </div>\n' +
            '    </form>';
    }
};