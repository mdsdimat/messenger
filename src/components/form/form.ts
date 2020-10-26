/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import Validation from "../../modules/validation.js";

export default class Form extends Block {
    props: any;
    renderToString: any;
    _element: any;
    fields: string;
    buttons: string;

    constructor(props: {}, fields: string, buttons: string) {
        super("div", props);
        this.fields = fields;
        this.buttons = buttons;
    }

    initEvents(block: Block) {
        const validation = new Validation(this.props);
        block._element.onsubmit = (e) => {validation.formValidation(e)};
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