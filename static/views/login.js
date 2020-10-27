import Signin from "../components/signin.js";
import { render } from "../modules/scripts.js";
const page = new Signin({
    typeBackground: 'login-background',
    title: 'Вход',
    formClassName: 'js-form',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            className: 'sign-form_input',
            type: 'text',
            value: 'test@test.re',
            validation: [
                {
                    name: 'max',
                    value: 10,
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
    ]
});
render(".app", page);
//# sourceMappingURL=login.js.map