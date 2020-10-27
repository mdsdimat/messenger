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
        const validation = new FormValidation(this.props);
        block._element.onsubmit = (e: IEvent) => {validation.validate(e)};
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