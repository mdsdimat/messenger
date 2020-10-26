import Profile from "../components/profile.js";
import {render} from "../modules/scripts.js"

const page = new Profile({
    photo: 'img/profilePhoto.svg',
    name: 'Дима',
    formClassName: 'profile_form form js-form',
    fields: [
        {
            name: 'email',
            className: 'field_input',
            type: 'text',
            placeholder: 'Почта',
        },
        {
            name: 'login',
            className: 'field_input',
            type: 'text',
            placeholder: 'Логин',
        }
    ],
    buttonsClassName: '',
    buttons: [
        {
            className: 'field_button',
            type: 'submit',
            text: 'Изменить данные',
            parentClass: 'field-border',
        },
        {
            className: 'field_button button-error',
            text: 'Выйти',
        },
    ]
});

render(".app", page);