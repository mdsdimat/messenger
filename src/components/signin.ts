/// <reference path="../../globals.d.ts" />
import Block from "../modules/block.js";
import Input from "./form/input.js";
import Button from "./form/button.js";
import Form from "./form/form.js";

export default class Sign extends Block {
    props: any;

    constructor(props: {}) {
        super("div", props);
    }

    getFields():string {
        let renderFields: string = '';
        if (this.props.fields) {
            this.props.fields.forEach((field: any) => {
                const input = new Input(field);
                renderFields += '<div class="sign-form_input-block_label js-valid">\n' +
                    '            <label class="sign-form_label">' + field.label + '\n' +
                    input.renderToString() +
                    '            </label>\n' +
                    '            <div class="sign-form_error-text js-error-message" hidden></div>\n' +
                    '        </div>'
            });
        }
        return renderFields;
    }

    getButtons():string {
        let renderFields: string = '';
        if (this.props.buttons) {
            this.props.buttons.forEach((field: any) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getTemplate() {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return '<main class="sign-form {{typeBackground}}">\n' +
            '    <div class="sign-form_title">{{title}}</div>\n' +
                    form.renderToString() +
            '</main>';
    }
};