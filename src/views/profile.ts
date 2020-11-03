import Profile from "../components/profile.js";

export default class ViewProfile extends Profile {
    constructor(props: {}) {
        props = {
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
        };
        super(props);
    }
}