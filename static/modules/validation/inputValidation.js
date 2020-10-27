import Validation from "./validation.js";
export default class InputValidation extends Validation {
    constructor() {
        super(...arguments);
        this.validate = (event) => {
            const target = event.target;
            this.doValidation(this.props.validation, target);
        };
    }
}
//# sourceMappingURL=inputValidation.js.map