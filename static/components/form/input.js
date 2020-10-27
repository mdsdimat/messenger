/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import InputValidation from "../../modules/validation/inputValidation.js";
export default class Input extends Block {
    constructor(props) {
        super("div", props);
    }
    initEvents(block) {
        const validation = new InputValidation(this.props);
        block._element.firstChild.onfocus = (e) => { validation.validate(e); };
        block._element.firstChild.onblur = (e) => { validation.validate(e); };
    }
    getTemplate() {
        return '<input name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">';
    }
}
;
//# sourceMappingURL=input.js.map