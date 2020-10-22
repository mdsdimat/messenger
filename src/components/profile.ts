/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
import Input from "./form/input.js";
import Button from "./form/button.js";

export default class Profile extends Block {
    props: object;

    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }

    getFields() {
        let renderField = '';
        // @ts-ignore
        this.props.fields.forEach((field) => {
            const input = new Input(field);
            if (field.type === 'file') {
                renderField += '' +
                    '        <div class="field field-border">\n' +
                    '            <label class="field_label">Аватар</label>\n' +
                    '            <label class="field_input-file-label">\n' +
                                     input.render() +
                    '                Выберете файл\n' +
                    '            </label>\n' +
                    '        </div>'
            } else {
                renderField += '<div class="field field-border">\n' +
                    '            <label class="field_label">' + field.placeholder + '</label>\n' +
                                 input.render() +
                    '        </div>';
            }
        });
        return renderField;
    }
    getButtons() {
        let renderField = '';
        // @ts-ignore
        this.props.buttons.forEach((field) => {
            const button = new Button(field);
            renderField += `<div ${field.className ? `class="${field.className}"` : ''}>\n` +
                                button.render() +
                '           </div>\n';
        });
        return renderField;
    }
    getTemplate() {
        return '<main class="profile">\n' +
            '    <img class="back" src="img/icons/back_arrow_ellipse.svg">\n' +
            '    <img class="profile_image" src="{{photo}}">\n' +
            '    <h1 class="profile_name">{{name}}</h1>\n' +
            '    <form class="profile_form form js-form">\n' +
                     this.getFields() +
            '        <div class="{{buttonsClassName}}">\n' +
                        this.getButtons() +
            '        </div>\n' +
            '    </form>';
    }

    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
};