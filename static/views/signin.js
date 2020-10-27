import Sign from "../components/signin.js";
import { render } from "../modules/scripts.js";
const page = new Sign({
    typeBackground: 'sign-background',
    title: 'Регистрация',
    formClassName: 'js-form',
    fields: [
        {
            label: 'Имя',
            name: 'name',
            className: 'sign-form_input',
            type: 'text',
            value: 'Дима',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            className: 'sign-form_input',
            type: 'text',
            value: 'Димский',
        },
        {
            label: 'Логин',
            name: 'login',
            className: 'sign-form_input',
            type: 'text',
            value: 'dima',
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
            value: '+375291234567',
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
            value: 'password',
            validation: [
                {
                    name: 'max',
                    value: 5,
                }
            ]
        },
        {
            label: 'Пароль (ещё раз)',
            name: 'confirm_password',
            className: 'sign-form_input',
            type: 'password',
            value: 'password',
        },
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
        }
    ],
});
render(".app", page);
//# sourceMappingURL=signin.js.map