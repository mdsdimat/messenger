import Validation, {IEvent, IField} from "./validation";

export default class FormValidation extends Validation {
    validate = (e: IEvent) => {
        e.preventDefault();
        const target = e.target;
        const inputs = target.getElementsByTagName('input');
        let isValid = true;
        for (let input of inputs) {
            const searchedField: IField | undefined = this.getField(input.name);
            if (searchedField !== undefined) {
                if (!this.doValidation(searchedField.validation, input)) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }

    getField(name: string): IField | undefined {
        return this.props.fields.find((field: { name: string }) => {
            if (field.name === name) {
                return name;
            }
        });
    }
}