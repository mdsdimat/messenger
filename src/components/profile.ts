import Block from "../modules/block";
import Input from "./form/input";
import Button from "./form/button";
import Form from "./form/form";

export default class Profile extends Block {
    props: {
        fields: [];
        buttons: [];
        backButton: {},
        formClassName: string,
        photo: string,
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
                                button.renderToString() +
                '           </div>\n';
        });
        return renderField;
    }
    getBackButton() {
        const button = new Button(this.props.backButton);
        return button.renderToString();
    }
    getTemplate() {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return '<main class="profile">\n' +
                    this.getBackButton() +
            '    <img class="profile_image" src="{{photo}}">\n' +
            '    <h1 class="profile_name">{{name}}</h1>\n' +
                    form.renderToString() +
            '   </main>';
    }
};