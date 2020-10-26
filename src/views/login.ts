import Signin from "../components/signin.js";
import {render} from "../modules/scripts.js"

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
            validation: {
                rules: [
                    {
                        name: 'max',
                        value: 10,
                    },
                    {
                        name: 'required',
                    }
                ],
            }
        },
        {
            label: 'Пароль',
            name: 'password',
            className: 'sign-form_input',
            type: 'password',
            validation: {
                rules: [
                    {
                        name: 'required',
                    }
                ]
            }
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

// const validation = new Validation(page);
// validation.setValidation();

// const form = document.getElementsByClassName('js-form');
// form[0].addEventListener('submit', function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     for (let pair of formData.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//     }
//     console.log(page.props);
// });


// form[0].addEventListener("focus", () => page.onfocus(), true);