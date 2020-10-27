/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import FormValidation from "../../modules/validation/formValidation.js";
export default class Form extends Block {
    constructor(props, fields, buttons) {
        super("div", props);
        this.fields = fields;
        this.buttons = buttons;
    }
    initEvents(block) {
        const validation = new FormValidation(this.props);
        block._element.onsubmit = (e) => { validation.validate(e); };
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