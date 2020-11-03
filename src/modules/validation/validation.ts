interface IProps {
    fields: IField[],
    validation: [],
}

interface ITarget {
    value: string,
    classList: DOMTokenList,
    closest: (key: string) => Element,
    hidden: boolean,
    getElementsByTagName: (key: string) => ITarget[],
    name: string
}

export interface IEvent {
    target: ITarget,
    preventDefault: () => void,
}

interface IValidationResult {
    valid: boolean,
    message: string,
}

export interface IField {
    name: string,
    validation: []
}

export default abstract class Validation {
    props: IProps;
    regMobile = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
    regEmail = new RegExp(/\S+@\S+\.\S+/);

    constructor(props: IProps) {
        this.props = props;
    }

    abstract validate(event: IEvent): void;

    doValidation(validation: [] | undefined, target: ITarget): boolean {
        if (validation === undefined) {return true;}
        const message = <HTMLElement>target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
        let isValid = true;
        for (let i = 0; i < validation.length; i++) {
            const validResult = this.getValidationFunction(validation[i], target.value);
            if (validResult !== undefined && !validResult.valid) {
                target.classList.add('input-error');
                this.showErrorMessage(message, validResult.message);
                isValid = validResult.valid;
            }
        }
        if (isValid && target.classList.contains('input-error')) {
            target.classList.remove('input-error');
            this.hideErrorMessage(message);
        }
        return isValid;
    }

    hideErrorMessage(message: HTMLElement): void {
        message.textContent = '';
        message.hidden = true;
    }

    showErrorMessage(message: HTMLElement, messageText: string): void {
        message.textContent = messageText;
        message.hidden = false;
    }

    getValidationFunction(rule: { name: string, value: number }, value: string): IValidationResult | undefined {
        switch (rule.name) {
            case 'max': {
                return this.max(rule.value, value);
            }
            case 'required': {
                return this.required(value);
            }
            case 'mobile': {
                return this.mobile(value);
            }
            case 'email': {
                return this.email(value);
            }
            default:
                return {valid: true, message: ``};
        }
    }

    max(maxVal: number, val: string): IValidationResult | undefined {
        if (val.length > maxVal) {
            return {valid: false, message: `Длина должна быть меньше ${maxVal}`};
        }
    }

    required(val: string): IValidationResult | undefined {
        if (val.length === 0) {
            return {valid: false, message: `Обязательно для заполнения`};
        }
    }

    mobile(val: string): IValidationResult | undefined {
        if (!this.regMobile.test(val)) {
            return {valid: false, message: `Не соответствует формату`};
        }
    }

    email(val: string): IValidationResult | undefined {
        if (!this.regEmail.test(val)) {
            return {valid: false, message: `Не соответствует формату`};
        }
    }
}