/// <reference path="../../globals.d.ts" />
import Block from "../modules/block.js";
import Input from "./form/input.js";
import Button from "./form/button.js";
import Form from "./form/form.js";

export default class Profile extends Block {
    props: {
        fields: any;
        buttons: any;
    };

    constructor(props: {}) {
        super("div", props);
    }

    getFields() {
        let renderField = '';
        this.props.fields.forEach((field: {type: string, placeholder: string}) => {
            const input = new Input(field);
            if (field.type === 'file') {
                renderField += '' +
                    '        <div class="field field-border js-valid">\n' +
                    '            <label class="field_label">Аватар</label>\n' +
                    '            <label class="field_input-file-label">\n' +
                                     input.renderToString() +
                    '                Выберете файл\n' +
                    '            </label>\n' +
                    '        </div>'
            } else {
                renderField += '<div class="field field-border js-valid">\n' +
                    '            <label class="field_label">' + field.placeholder + '</label>\n' +
                                 input.renderToString() +
                    '            <div class="field_label input-error js-error-message" hidden></div>\n' +
                    '        </div>';
            }
        });
        return renderField;
    }
    getButtons() {
        let renderField = '';
        this.props.buttons.forEach((field: {buttonsClassName: string}) => {
            const button = new Button(field);
            renderField += `<div ${field.buttonsClassName ? `class="${field.buttonsClassName}"` : ''}>\n` +
                                button.render() +
                '           </div>\n';
        });
        return renderField;
    }
    getTemplate() {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return '<main class="profile">\n' +
            '    <img class="back" src="img/icons/back_arrow_ellipse.svg">\n' +
            '    <img class="profile_image" src="{{photo}}">\n' +
            '    <h1 class="profile_name">{{name}}</h1>\n' +
                    form.renderToString();
    }
};