import Block from "../modules/block";
import Input from "./form/input";
import Button from "./form/button";
import Form from "./form/form";
import style from "../css/sign.css";
import "../css/sign.css"

export default class Sign extends Block {
    props: {
        fields: [
            Record<string, unknown>
        ],
        buttons: [],
        userMessageModal: {
            isShow: boolean,
            button: Record<string, unknown>,
            text?: string,
        },
        formClassName: string,
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getFields():string {
        let renderFields = '';
        if (this.props.fields) {
            this.props.fields.forEach((field) => {
                const input = new Input(field);
                renderFields += `<div class="${style.signFormInputBlockLabel} js-valid">\n` +
                    `            <label class="${style.signFormLabel}">${field.label}\n` +
                                    input.renderToString() +
                    '            </label>\n' +
                    `            <div class="${style.signFormErrorText} js-error-message" hidden></div>\n` +
                    '        </div>'
            });
        }
        return renderFields;
    }

    getButtons():string {
        let renderFields = '';
        if (this.props.buttons) {
            this.props.buttons.forEach((field) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getUserMessage(): string {
        if (this.props.userMessageModal.isShow) {
            const button = new Button(this.props.userMessageModal.button);
            return '    <div class="modal-wrapper">\n' +
                '        <div class="modal-window">\n' +
                '            <p class="modal-window_title">{{this.userMessageModal.text}}</p>\n' +
                '            <div class="modal-window_buttons">\n' +
                                button.renderToString() +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="overlay"></div>\n' +
                '    </div>\n';
        } else {
            return '';
        }
    }

    getTemplate(): string {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return this.getUserMessage() +
            `<main class="${style.signForm} {{typeBackground}}">\n` +
            `    <div class="${style.signFormTitle}">{{title}}</div>\n` +
                    form.renderToString() +
            '   </main>';
    }
}