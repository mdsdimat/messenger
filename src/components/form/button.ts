/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import {IEvent} from "../../modules/validation/validation.js";

export default class Button extends Block {
    props: {
        actions: {
            goto: () => {}
        }
    };

    constructor(props: {}) {
        super("div", props);
    }

    initEvents(block: Block) {
        if (block._element && this.props.actions) {
            block._element.onclick = (e: IEvent) => {
                e.preventDefault();
                this.props.actions.goto();
            };
        }
    }

    getTemplate() {
        return '<button type="{{type}}" class="{{className}}">{{text}}</button>';
    }
};