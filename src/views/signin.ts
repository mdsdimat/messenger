import Sign from "../components/signin.js";
import Router from "../modules/routing/router.js";
import {getFormData} from "../modules/scripts.js";
import AuthController from "../http/controllers/AuthController";

export default class Signin extends Sign {
    constructor(props: {}) {
        super(props);
        props = {
            typeBackground: 'sign-background',
            title: 'Регистрация',
            formClassName: 'js-form',
            fields: [
                {
                    label: 'Имя',
                    name: 'first_name',
                    className: 'sign-form_input',
                    type: 'text',
                    value: 'Name',
                },
                {
                    label: 'Фамилия',
                    name: 'second_name',
                    className: 'sign-form_input',
                    type: 'text',
                    value: 'Second',
                },
                {
                    label: 'Логин',
                    name: 'login',
                    className: 'sign-form_input',
                    type: 'text',
                    value: 'login25435234',
                },
                {
                    label: 'Почта',
                    name: 'email',
                    className: 'sign-form_input',
                    type: 'text',
                    value: 'dima@yandex.ru',
                    validation: [
                        {
                            name: 'email'
                        }
                    ]
                },
                {
                    label: 'Телефон',
                    name: 'phone',
                    className: 'sign-form_input',
                    type: 'text',
                    value: '+79261234567',
                    validation: [
                        {
                            name: 'mobile'
                        }
                    ]
                },
                {
                    label: 'Пароль',
                    name: 'password',
                    className: 'sign-form_input',
                    type: 'password',
                    value: 'passw',
                    validation: [
                        {
                            name: 'max',
                            value: 5,
                        },
                        {
                            name: 'required'
                        }
                    ]
                }
            ],
            buttonsClassName: 'sign-form_button-block',
            buttons: [
                {
                    type: 'submit',
                    className: 'sign-form_button-block-form_submit',
                    text: 'Зарегистрироваться',
                },
                {
                    className: 'sign-form_button-block-form_cancel',
                    text: 'Войти',
                    action: () => {
                        const router = new Router();
                        router.go("#/login");
                    }
                }
            ],
            actions: {
                submit: () => {
                    const formData = getFormData(this.props.formClassName)
                    const auth = new AuthController();
                    auth.signin(formData, 'https://ya-praktikum.tech/api/v2/auth/signup');
                }
            }
        };
        this.setProps(props)
    }
}