/// <reference path="../../../globals.d.ts" />

// @ts-ignore
import Block from '/src/modules/block.js';

export default class Input extends Block {
    props: object;

    constructor(props) {
        super("div", props);

    }

    getTemplate() {
        Handlebars.registerHelper('validation', function(context) {
            if (context.validation) {
                return JSON.stringify(context.validation);
            }
            return false;
        });

        return '<input name="{{name}}" class="{{className}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}" data-validation="{{validation this}}"">';
    }

    render() {

        return Handlebars.compile(this.getTemplate())(this.props);
    }
};