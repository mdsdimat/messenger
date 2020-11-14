/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block";
import {IEvent} from "../../modules/validation/validation";

export default class Button extends Block {
    props: {
        action: () => {}
    };

    constructor(props: {}) {
        super("div", props);
    }

    initEvents(block: Block) {
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