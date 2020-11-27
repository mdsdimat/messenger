import Block from "../modules/block";
import Form from "./form/form";
import Input from "./form/input";
import Button from "./form/button";

export default class Modal extends Block {
    props: {
        fields: [],
        buttons: [],
    }

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getFields(): string {
        let renderFields = '';
        if (this.props.fields) {
            this.props.fields.forEach((field) => {
                const input = new Input(field);
                renderFields += `${input.renderToString()}`
            });
        }
        return renderFields;
    }

    getButtons(): string {
        let renderFields = '';
        if (this.props.buttons) {
            this.props.buttons.forEach((field) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getTemplate(): string {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return '    <div class="modal-wrapper">\n' +
            '        <div class="modal-window">\n' +
                        form.renderToString() +
            '        </div>\n' +
            '        <div class="overlay"></div>\n' +
            '    </div>\n';
    }

}