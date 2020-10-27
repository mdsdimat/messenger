import Validation, {IEvent, IField} from "./validation.js";

export default class FormValidation extends Validation {
    validate = (e: IEvent) => {
        const target = e.target;
        const inputs = target.getElementsByTagName('input');
        for (let input of inputs) {
            const searchedField: IField | undefined = this.getField(input.name);
            if (searchedField !== undefined) {
                this.doValidation(searchedField.validation, input);
            }
        }
        e.preventDefault();
    }

    getField(name: string): IField | undefined {
        return this.props.fields.find((field: { name: string }) => {
            if (field.name === name) {
                return name;
            }
        });
    }
}