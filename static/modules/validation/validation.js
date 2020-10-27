export default class Validation {
    constructor(props) {
        this.regMobile = new RegExp(/^(\+)[37]\d{11}$/);
        this.regEmail = new RegExp(/\S+@\S+\.\S+/);
        this.props = props;
    }
    doValidation(validation, target) {
        if (validation === undefined) {
            return true;
        }
        for (let i = 0; i < validation.length; i++) {
            const validResult = this.getValidationFunction(validation[i], target.value);
            const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
            if (validResult !== undefined && !validResult.valid) {
                target.classList.add('input-error');
                this.showErrorMessage(message, validResult.message);
            }
            else if (target.classList.contains('input-error')) {
                target.classList.remove('input-error');
                this.hideErrorMessage(message);
            }
        }
    }
    hideErrorMessage(message) {
        message.textContent = '';
        message.hidden = true;
    }
    showErrorMessage(message, messageText) {
        message.textContent = messageText;
        message.hidden = false;
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