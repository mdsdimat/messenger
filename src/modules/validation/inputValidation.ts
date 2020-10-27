import Validation, {IEvent} from "./validation.js";

export default class InputValidation extends Validation {
    validate = (event: IEvent) => {
        const target = event.target;
        this.doValidation(this.props.validation, target);
    }
}