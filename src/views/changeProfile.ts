import Profile from "../components/profile.js";

export default class ChangeProfile extends Profile {
    constructor(props: {}) {
        props = {
            photo: 'img/profilePhoto.svg',
            name: 'Дима',
            formClassName: 'profile_form form js-form',
            fields: [
                {
                    name: 'name',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Имя',
                    value: 'Дима',
                    validation: [
                        {
                            name: 'max',
                            value: 3,
                        },
                        {
                            name: 'required',
                        }
                    ],
                },
                {
                    name: 'second_name',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Фамилия',
                    value: 'Димский',
                },
                {
                    name: 'view_name',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Отображаемое имя',
                    value: 'Dima',
                },
                {
                    name: 'login',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Логин',
                    value: 'Dima',
                },
                {
                    name: 'email',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Email',
                    value: 'test@yandex.ru',
                },
                {
                    name: 'phone',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Телфон',
                    value: '+375291234567',
                },
                {
                    name: 'avatar',
                    className: 'field_input-file',
                    type: 'file',
                    placeholder: 'Аватар',
                    value: '',
                },
                {
                    name: 'password',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Пароль',
                    value: 'password',
                },
                {
                    name: 'confirm_password',
                    className: 'field_input',
                    type: 'text',
                    placeholder: 'Пароль (ещё раз)',
                    value: 'password',
                },
            ],
            buttons: [
                {
                    className: 'profile_form_save-button',
                    text: 'Сохранить',
                }
            ]
        };
        super(props);
    }
}