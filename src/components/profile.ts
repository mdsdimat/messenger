import Input from "components/form/Input";
import Button from "components/form/Button";
import Form from "components/form/Form";
import Block from "modules/Block";

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
                            <div class="field field-border js-valid">
                                <label class="field_label">Аватар</label>
                                <label class="field_input-file-label">
                                     ${input.renderToString()}
                                    Выберете файл
                                </label>
                            </div>`
            } else {
                renderField += `
                           <div class="field field-border js-valid">
                                <label class="field_label">${field.placeholder}</label>
                                 ${input.renderToString()}
                                <div class="field_label input-error js-error-message" hidden></div>
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
        return `<main class="profile">
                    ${this.getBackButton()}
                <img class="profile_image" src="{{photo}}" alt="">
                <h1 class="profile_name">{{name}}</h1>
                    ${form.renderToString()}
               </main>`;
    }
}