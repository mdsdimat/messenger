/// <reference path="../../../globals.d.ts" />

// @ts-ignore
import Block from '/src/modules/block.js';

export default class Button extends Block {
    props: object;

    constructor(props) {
        super("div", props);
    }

    getTemplate() {
        return '<button type="{{type}}" class="{{className}}">{{text}}</button>';
    }

    render() {

        return Handlebars.compile(this.getTemplate())(this.props);
    }
};