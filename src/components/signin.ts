/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
import Input from "./form/input.js";
import Button from "./form/button.js";

export default class Login extends Block {
    props: object;

    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }

    getFields():string {
        let renderFields: string = '';
        // @ts-ignore
        this.props.fields.forEach((field) => {
            const input = new Input(field);
            renderFields += '<div class="sign-form_input-block_label">\n' +
                '            <label class="sign-form_label">' + field.label + '\n' +
                                input.render() +
                '            </label>\n' +
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
            '        <div class="sign-form_input-block_label">\n' +
            '            <label class="sign-form_label">Пароль (ещё раз)\n' +
            '                <input name="confirm_password" class="sign-form_input sign-form_input-error" type="password" value="password1">\n' +
            '            </label>\n' +
            '            <div class="sign-form_error-text">Пароли не совпадают</div>\n' +
            '        </div>\n' +
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