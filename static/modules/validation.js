export default class Validation {
    constructor(props) {
        this.validator = (event) => {
            const validation = this.pageProps.validation;
            const target = event.target;
            return this.doValidation(validation, target);
        };
        this.pageProps = props;
    }
    doValidation(validation, target) {
        if (validation) {
            for (let i = 0; i < validation.rules.length; i++) {
                const rule = validation.rules[i];
                const validFunc = this.getValidationFunction(rule, target.value);
                if (validFunc !== true) {
                    target.classList.add('input-error');
                    const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
                    message.textContent = validFunc;
                    message.hidden = false;
                    return false;
                }
                else {
                    target.classList.remove('input-error');
                    const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
                    message.textContent = '';
                    message.hidden = true;
                    return true;
                }
            }
        }
        return true;
    }
    getField(name) {
        let searchField = '';
        this.pageProps.fields.forEach((field) => {
            if (field.name === name) {
                searchField = field;
            }
        });
        return searchField;
    }
    formValidation(e) {
        const target = e.target;
        const inputs = [...target.getElementsByTagName('input')];
        inputs.forEach((input) => {
            const needField = this.getField(input.name);
            this.doValidation(needField.validation, input);
        });
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
                return true;
        }
    }
    max(maxVal, val) {
        if (val.length > maxVal) {
            return `Длина должна быть меньше ${maxVal}`;
        }
        return true;
    }
    required(val) {
        if (val.length === 0) {
            return `Обязательно для заполнения`;
        }
        return true;
    }
    mobile(val) {
        const reg = new RegExp(/^(\+)[37]\d{11}$/);
        const result = reg.test(val);
        if (!result) {
            return 'Не соответствует формату';
        }
        return true;
    }
    email(val) {
        const reg = new RegExp(/\S+@\S+\.\S+/);
        const result = reg.test(val);
        if (!result) {
            return 'Не соответствует формату';
        }
        return true;
    }
}
//# sourceMappingURL=validation.js.map