/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";

export default class Button extends Block {
    props: object;
    renderToString: any;

    constructor(props: {}) {
        super("div", props);
    }

    getTemplate() {
        return '<button type="{{type}}" class="{{className}}">{{text}}</button>';
    }
};