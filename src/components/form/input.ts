/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import {IEvent} from "../../modules/validation/validation.js";
import InputValidation from "../../modules/validation/inputValidation.js";

export default class Input extends Block {
    props: any;

    constructor(props: {}) {
        super("div", props);
    }

    initEvents(block: Block) {
        if (block._element) {
            const validation = new InputValidation(this.props);
            block._element.firstChild.onfocus = (e: IEvent) => {validation.validate(e)};
            block._element.firstChild.onblur = (e: IEvent) => {validation.validate(e)};
        }
    }

    getTemplate() {
        return '<input id="{{id}}" name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">';
    }
};