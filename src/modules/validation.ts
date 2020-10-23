import Button from "../components/form/button";
import Block from "./block.js";

export default class Validation {
    page: Block;

    constructor(component: Block) {
        this.page = component;
    }

    validator = (event) => {
        console.log(23423)
        // this.page.setProps(this.page.props)
        const name = event.target.name;
        const field: object = this.getField(name);
        field.label = 3456354;
        this.page.setProps(this.page.props);


        // if (validation) {
        //     const target = event.target;
        //     for (let i = 0; i < validation.rules.length; i++) {
        //         const rule = validation.rules[i];
        //         const validFunc = this.getValidationFunction(rule, target.value);
        //         if (validFunc !== true) {
        //             target.classList.add('input-error');
        //             const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
        //             message.innerHTML = validFunc;
        //             message.hidden = false;
        //             return;
        //         } else {
        //             target.classList.remove('input-error');
        //             const message = target.closest('.js-valid').getElementsByClassName('js-error-message')[0];
        //             message.innerHTML = '';
        //             message.hidden = true;
        //         }
        //
        //     }
        // }
    }

    getField(name) {
        let searchField = null;
        this.page.props.fields.forEach((field) => {
            if (field.name === name) {
                searchField = field;
            }
        });
        return searchField;
    }

    setValidation() {
        const inputElements = document.getElementsByTagName('input');
        const formElements = document.getElementsByTagName('form');


        for (let i = 0; i < inputElements.length; i++) {
            const input = inputElements[i];
            input.addEventListener('focus', this.validator);
            input.addEventListener('blur', this.validator);
        }

        for (let i = 0; i < formElements.length; i++) {
            const input = formElements[i];
            input.addEventListener('submit', (event) => {console.log(event)});
        }
    }

    getValidationFunction(rule, value) {
        switch (rule.name) {
            case 'max': {
                return this.max(rule.value, value);
            }
            case 'required': {
                return this.required(value);
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
}