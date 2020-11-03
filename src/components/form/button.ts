/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import {IEvent} from "../../modules/validation/validation.js";

export default class Button extends Block {
    props: {
        action: () => {}
    };

    constructor(props: {}) {
        super("div", props);
    }

    initEvents(block: Block) {
        console.log(block._element);
        if (block._element && this.props.action) {
            block._element.onclick = (e: IEvent) => {
                e.preventDefault();
                this.props.action();
            };
        }
    }

    getTemplate() {
        return '<button type="{{type}}" class="{{className}}">{{text}}</button>';
    }
};