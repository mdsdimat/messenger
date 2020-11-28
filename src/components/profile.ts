import Input from "components/form/Input";
import Button from "components/form/Button";
import Form from "components/form/Form";
import Block from "modules/Block";
import style from "css/profile.css";

export default class Profile extends Block {
    props: {
        fields: Record<string, unknown>[];
        buttons: [];
        backButton: Record<string, unknown>,
        formClassName: string,
        photo: string,
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getFields(): string {
        let renderField = '';
        this.props.fields.forEach((field: {type: string, placeholder: string}) => {
            const input = new Input(field);
            if (field.type === 'file') {
                renderField += `
                            <div class="${style.field} ${style.fieldBorder} js-valid">
                                <label class="${style.fieldLabel}">Аватар</label>
                                <label class="${style.fieldInputFileLabel}">
                                     ${input.renderToString()}
                                    Выберете файл
                                </label>
                            </div>`
            } else {
                renderField += `
                           <div class="${style.field} ${style.fieldBorder} js-valid">
                                <label class="${style.fieldLabel}">${field.placeholder}</label>
                                 ${input.renderToString()}
                                <div class="${style.fieldLabel} ${style.inputError} js-error-message" hidden></div>
                            </div>`;
            }
        });
        return renderField;
    }
    getButtons(): string {
        let renderField = '';
        this.props.buttons.forEach((field: {buttonsClassName: string}) => {
            const button = new Button(field);
            renderField += `<div ${field.buttonsClassName ? 'class="${field.buttonsClassName}"' : ""}>
                                ${button.renderToString()}
                           </div>`;
        });
        return renderField;
    }
    getBackButton(): string {
        const button = new Button(this.props.backButton);
        return button.renderToString();
    }
    getTemplate(): string {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return `<main class="${style.profile}">
                    ${this.getBackButton()}
                <img class="${style.profileImage}" src="{{photo}}" alt="">
                <h1 class="${style.profileName}">{{name}}</h1>
                    ${form.renderToString()}
               </main>`;
    }
}