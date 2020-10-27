import Validation from "./validation.js";
export default class FormValidation extends Validation {
    constructor() {
        super(...arguments);
        this.validate = (e) => {
            const target = e.target;
            const inputs = target.getElementsByTagName('input');
            for (let input of inputs) {
                const searchedField = this.getField(input.name);
                if (searchedField !== undefined) {
                    this.doValidation(searchedField.validation, input);
                }
            }
            e.preventDefault();
        };
    }
    getField(name) {
        return this.props.fields.find((field) => {
            if (field.name === name) {
                return name;
            }
        });
    }
}
//# sourceMappingURL=formValidation.js.map