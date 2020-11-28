import Input from "components/form/Input";
import Button from "components/form/Button";
import Form from "components/form/Form";
import Block from "modules/Block";


export default class Modal extends Block {
    props: {
        fields: [],
        buttons: [],
    }

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getFields(): string {
        return this.renderElement(this.props.fields, Input)
    }

    getButtons(): string {
        return this.renderElement(this.props.buttons, Button)
    }

    getTemplate(): string {
        const form = new Form(this.props, this.getFields(), this.getButtons());
        return `<div class="modal-wrapper">
                    <div class="modal-window">
                        ${form.renderToString()}
                    </div>
                    <div class="overlay"></div>
               </div>`;
    }

}