import Validation, {IEvent} from "modules/validation/Validation";

export default class InputValidation extends Validation {
    validate = (event: IEvent): void => {
        const target = event.target;
        this.doValidation(this.props.validation, target);
    }
}