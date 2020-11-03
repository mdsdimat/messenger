import Sign from "../components/signin.js";
import {submitForm} from "../modules/scripts.js";

export default class Login extends Sign {
    constructor(props: {}) {
        props = {
            typeBackground: 'login-background',
            title: 'Вход',
            formClassName: 'js-form',
            fields: [
                {
                    label: 'Логин',
                    name: 'login',
                    className: 'sign-form_input',
                    type: 'text',
                    value: 'login25435234',
                    validation: [
                        {
                            name: 'max',
                            value: 20,
                        },
                        {
                            name: 'required',
                        }
                    ],
                },
                {
                    label: 'Пароль',
                    name: 'password',
                    className: 'sign-form_input',
                    type: 'password',
                    value: 'passw',
                    validation: [
                        {
                            name: 'required',
                        }
                    ]
                },
            ],
            buttonsClassName: 'sign-form_button-block',
            buttons: [
                {
                    className: 'sign-form_button-block-form_submit',
                    text: 'Авторизоваться',
                },
                {
                    className: 'sign-form_button-block-form_cancel',
                    text: 'Нет аккаунта?',
                }
            ],
            actions: {
                submit: () => {
                    submitForm(this.props.formClassName, 'https://ya-praktikum.tech/api/v2/auth/signin')
                }
            }
        };
        super(props);
        this.setProps(props)
    }
}