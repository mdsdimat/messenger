import Validation, {IEvent} from "./validation";

export default class InputValidation extends Validation {
    validate = (event: IEvent): void => {
        const target = event.target;
        this.doValidation(this.props.validation, target);
    }
}