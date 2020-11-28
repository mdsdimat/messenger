import Input from "components/form/Input";
import Button from "components/form/Button";
import Form from "components/form/Form";
import style from "css/sign.css";
import "css/sign.css"
import Block from "modules/Block";

export default class Sign extends Block {
    props: {
        typeBackground: string,
        title: string,
        formClassName: string,
        fields: Record<string, unknown>[],
        buttonsClassName: string,
        buttons: Record<string, unknown>[],
        actions: Record<string, unknown>,
        userMessageModal: {
            isShow: boolean,
            button: Record<string, unknown>,
            text?: string,
        },
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getFields():string {
        let renderFields = '';
        if (this.props.fields) {
            this.props.fields.forEach((field) => {
                const input = new Input(field);
                renderFields += `
                            <div class="${style.signFormInputBlockLabel} js-valid">
                                <label class="${style.signFormLabel}">${field.label}
                                    ${input.renderToString()}
                                </label>
                                <div class="${style.signFormErrorText} js-error-message" hidden></div>
                            </div>`
            });
        }
        return renderFields;
    }

    getButtons():string {
        return this.renderElement(this.props.buttons, Button)
    }

    getUserMessage(): string {
        if (this.props.userMessageModal.isShow) {
            const button = new Button(this.props.userMessageModal.button);
            return ` <div class="modal-wrapper">
                        <div class="modal-window">
                            <p class="modal-window_title">{{this.userMessageModal.text}}</p>
                            <div class="modal-window_buttons">
                                ${button.renderToString()}
                            </div>
                        </div>
                        <div class="overlay"></div>
                    </div>`;
        } else {
            return '';
        }
    }

    getTemplate(): string {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return this.getUserMessage() +
            `<main class="${style.signForm} {{typeBackground}}">
                <div class="${style.signFormTitle}">{{title}}</div>
                    ${form.renderToString()}
            </main>`;
    }
}