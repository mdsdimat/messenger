/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
import Input from "./form/input.js";

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

    getTemplate() {
        return '<main class="sign-form login-background">\n' +
            '    <div class="sign-form_title">{{title}}</div>\n' +
            '    <form class="js-form form">\n' +
                     this.getFields() +
            '        <div class="sign-form_button-block">\n' +
            '            <button type="submit" class="sign-form_button-block-form_submit">Авторизоваться</button>\n' +
            '            <button class="sign-form_button-block-form_cancel">Нет аккаунта?</button>\n' +
            '        </div>\n' +
            '    </form>\n' +
            '</main>';
    }

    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
};