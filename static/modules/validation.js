export default class Validation {
    constructor(props) {
        this.regMobile = new RegExp(/^(\+)[37]\d{11}$/);
        this.regEmail = new RegExp(/\S+@\S+\.\S+/);
        this.validator = (event) => {
            const validation = this.props.validation;
            const target = event.target;
            this.doValidation(validation, target);
        };
        this.props = props;
    }
    doValidation(validation, target) {
        if (!validation) {
            return true;
        }
        for (let i = 0; i < validation.length; i++) {
            const rule = validation[i];
            const validFunc = this.getValidationFunction(rule, target.value);
            target.classList.remove('input-error');
            const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
            message.textContent = '';
            message.hidden = true;
            if (validFunc !== undefined && !validFunc.valid) {
                target.classList.add('input-error');
                const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
                message.textContent = validFunc.message;
                message.hidden = false;
            }
        }
    }
    getField(name) {
        return this.props.fields.find((field) => {
            if (field.name === name) {
                return name;
            }
        });
    }
    formValidation(e) {
        const target = e.target;
        const inputs = target.getElementsByTagName('input');
        for (let input of inputs) {
            const searchedField = this.getField(input.name);
            if (searchedField !== undefined) {
                this.doValidation(searchedField.validation, input);
            }
        }
        e.preventDefault();
    }
    getValidationFunction(rule, value) {
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
                return { valid: true, message: `` };
        }
    }
    max(maxVal, val) {
        if (val.length > maxVal) {
            return { valid: false, message: `Длина должна быть меньше ${maxVal}` };
        }
    }
    required(val) {
        if (val.length === 0) {
            return { valid: false, message: `Обязательно для заполнения` };
        }
    }
    mobile(val) {
        if (!this.regMobile.test(val)) {
            return { valid: false, message: `Не соответствует формату` };
        }
    }
    email(val) {
        if (!this.regEmail.test(val)) {
            return { valid: false, message: `Не соответствует формату` };
        }
    }
}
//# sourceMappingURL=validation.js.map