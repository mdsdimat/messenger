import Sign from "components/Signin";
import Router from "modules/routing/Router";
import AuthController from "http/controllers/AuthController";
import style from "css/sign.css";
import {ROUTES} from "modules/constants";
import {getFormData} from "modules/scripts";

export default class Signin extends Sign {
    constructor() {
        const props = {
            typeBackground: style.signBackground,
            title: 'Регистрация',
            formClassName: 'js-form',
            fields: [
                {
                    label: 'Имя',
                    name: 'first_name',
                    className: style.signFormInput,
                    type: 'text',
                    value: 'Name',
                },
                {
                    label: 'Фамилия',
                    name: 'second_name',
                    className: style.signFormInput,
                    type: 'text',
                    value: 'Second',
                },
                {
                    label: 'Логин',
                    name: 'login',
                    className: style.signFormInput,
                    type: 'text',
                    value: 'login25435234',
                },
                {
                    label: 'Почта',
                    name: 'email',
                    className: style.signFormInput,
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
                    className: style.signFormInput,
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
                    className: style.signFormInput,
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
            buttonsClassName: style.signFormButtonBlock,
            buttons: [
                {
                    type: 'submit',
                    className: style.signFormButtonBlockFormSubmit,
                    text: 'Зарегистрироваться',
                },
                {
                    className: style.signFormButtonBlockFormCancel,
                    text: 'Войти',
                    action: () => {
                        const router = new Router();
                        router.go(ROUTES.LOGIN);
                    }
                }
            ],
            actions: {
                submit: () => {
                    const formData = getFormData(this.props.formClassName)
                    const auth = new AuthController();
                    auth.signup(formData)
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            userMessageModal: {
                isShow: false,
                text: '',
                button: {
                    type: 'submit',
                    className: 'modal-window_buttons_error',
                    text: 'Закрыть',
                    action: () => {
                        this.props.userMessageModal.isShow = false;
                        this.setProps(this.props)
                    }
                }
            }
        };
        super(props);
    }
}