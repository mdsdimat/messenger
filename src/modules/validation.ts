interface IProps {
    fields: IField[],
    validation: [],
}

interface ITarget {
    value: string,
    classList: DOMTokenList,
    closest: (key: string) => Element,
    hidden: boolean,
}

export interface IEvent {
    target: ITarget,
}

interface IValidationFunc {
    valid: boolean,
    message: string,
}

interface IField {
    name:string,
    validation: []
}

export default class Validation {
    props: IProps;
    regMobile = new RegExp(/^(\+)[37]\d{11}$/);
    regEmail = new RegExp(/\S+@\S+\.\S+/);

    constructor(props: IProps) {
        this.props = props;
    }

    validator = (event: IEvent) => {
        const validation = this.props.validation;
        const target = event.target;
        this.doValidation(validation, target);
    }

    doValidation(validation: [], target: ITarget) {
        if (!validation) {return true;}
        for (let i = 0; i < validation.length; i++) {
            const rule = validation[i];
            const validFunc = this.getValidationFunction(rule, target.value);

            target.classList.remove('input-error');
            const message = <HTMLElement>target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
            message.textContent = '';
            message.hidden = true;
            if (validFunc !== undefined &&!validFunc.valid) {
                target.classList.add('input-error');
                const message = <HTMLElement>target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
                message.textContent = validFunc.message;
                message.hidden = false;
            }
        }
    }

    getField(name: string): IField | undefined {
        return this.props.fields.find((field: {name:string}) => {
            if (field.name === name) {
                return name;
            }
        });
    }

    formValidation(e: any) {
        const target = e.target;
        const inputs = target.getElementsByTagName('input');
        for (let input of inputs) {
            const searchedField: IField|undefined = this.getField(input.name);
            if (searchedField !== undefined) {this.doValidation(searchedField.validation, input);}
        }
        e.preventDefault();
    }

    getValidationFunction(rule:{name:string, value:number}, value:string): IValidationFunc|undefined {
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

    max(maxVal:number, val:string): IValidationFunc|undefined {
        if (val.length > maxVal) {
            return {valid: false, message: `Длина должна быть меньше ${maxVal}`};
        }
    }

    required(val:string): IValidationFunc|undefined {
        if (val.length === 0) {
            return {valid: false, message: `Обязательно для заполнения`};
        }
    }

    mobile(val:string): IValidationFunc|undefined {
        if (!this.regMobile.test(val)) {
            return {valid: false, message: `Не соответствует формату`};
        }
    }

    email(val:string): IValidationFunc|undefined {
        if (!this.regEmail.test(val)) {
            return {valid: false, message: `Не соответствует формату`};
        }
    }
}