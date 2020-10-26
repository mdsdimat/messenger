/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import Validation from "../../modules/validation.js";
export default class Input extends Block {
    constructor(props) {
        super("div", props);
    }
    initEvents(block) {
        const validation = new Validation(this.props);
        block._element.firstChild.onfocus = (e) => { validation.validator(e); };
        block._element.firstChild.onblur = (e) => { validation.validator(e); };
    }
    getTemplate() {
        return '<input name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">';
    }
}
;
//# sourceMappingURL=input.js.map