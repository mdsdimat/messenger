/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
import Input from "./form/input.js";
import Button from "./form/button.js";

export default class Login extends Block {
    props: object;

    constructor(props) {
        super("div", props);
    }

    componentDidMount(oldProps) {
        console.log(345);
    }

    getFields():string {
        let renderFields: string = '';
        // @ts-ignore
        this.props.fields.forEach((field) => {
            const input = new Input(field);
            renderFields += '<div class="sign-form_input-block_label js-valid">\n' +
                '            <label class="sign-form_label">' + field.label + '\n' +
                                input.render() +
                '            </label>\n' +
                '            <div class="sign-form_error-text js-error-message" hidden></div>\n' +
                '        </div>'
        });
        return renderFields;
    }

    getButtons():string {
        let renderFields: string = '';
        // @ts-ignore
        this.props.buttons.forEach((field) => {
            const input = new Button(field);
            renderFields += input.render();
        });
        return renderFields;
    }

    getTemplate() {
        return '<main class="sign-form {{typeBackground}}">\n' +
            '    <div class="sign-form_title">{{title}}</div>\n' +
            '    <form class="js-form">\n' +
                     this.getFields() +
            '        <div class="sign-form_button-block">\n' +
                        this.getButtons() +
            '        </div>\n' +
            '    </form>\n' +
            '</main>';
    }

    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
};