/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import Validation from "../../modules/validation.js";
export default class Form extends Block {
    constructor(props, fields, buttons) {
        super("div", props);
        this.fields = fields;
        this.buttons = buttons;
    }
    initEvents(block) {
        const validation = new Validation(this.props);
        block._element.onsubmit = (e) => { validation.formValidation(e); };
    }
    getTemplate() {
        return '<form class="{{formClassName}}">\n' +
            this.fields +
            '        <div class="{{buttonsClassName}}">\n' +
            this.buttons +
            '        </div>\n' +
            '    </form>';
    }
}
;
//# sourceMappingURL=form.js.map