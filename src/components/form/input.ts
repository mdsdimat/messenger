/// <reference path="../../../globals.d.ts" />

// @ts-ignore
import Block from '/src/modules/block.js';

export default class Input extends Block {
    props: object;

    constructor(props) {
        super("div", props);
    }

    getTemplate() {
        return '<input name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}">';
    }

    render() {

        return Handlebars.compile(this.getTemplate())(this.props);
    }
};