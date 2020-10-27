/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import Validation, {IEvent} from "../../modules/validation.js";

export default class Input extends Block {
    props: any;

    constructor(props: {}) {
        super("div", props);
    }

    initEvents(block:Block) {
        const validation = new Validation(this.props);
        block._element.firstChild.onfocus = (e: IEvent) => {validation.validator(e)};
        block._element.firstChild.onblur = (e: IEvent) => {validation.validator(e)};
    }

    getTemplate() {
        return '<input name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">';
    }
};