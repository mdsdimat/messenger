import Profile from "../components/profile.js";
import Router from "../modules/routing/router";
import {ROUTES} from "../routes";
import AuthController from "../http/controllers/AuthController";
import {getFormData} from "../modules/scripts";
import ProfileController from "../http/controllers/ProfileController";
import {HOST} from "../http/services/transport";

export default class ChangeProfile extends Profile {
    constructor(props: {}) {
        props = {
            photo: 'img/profilePhoto.svg',
            name: 'Дима',
            backButton: {
                className: 'back',
                action: () => {
                    const router = new Router();
                    router.go(ROUTES.PROFILE);
                }
            },
            formClassName: 'profile_form form js-form',
            fields: [
                {
                    name: 'first_name',
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
                    name: 'display_name',
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
                    id: 'avatar',
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
                    action: () => {
                        const formData = getFormData('js-form');
                        if (formData) {
                            const profile = new ProfileController();
                            const avatar: any = formData.get('avatar');
                            if (avatar.size !== 0) {
                                const avatarData = new FormData();
                                avatarData.append('avatar', avatar);
                                profile.setAvatar(avatarData);
                            }
                            this.props.fields.forEach((field: any) => {
                                if (field.name === 'avatar') {
                                    formData.delete(field.name);
                                }
                            });
                            profile.changeProfile(formData);
                        }
                    }
                }
            ]
        };
        super(props);
    }

    componentDidMount() {
        const auth = new AuthController();
        auth.getUser()
            .then((result: XMLHttpRequest) => {
                const response = JSON.parse(result.response)
                const fields = this.props.fields;
                fields.forEach((field: any) => {
                    if (response[field.name]) {
                        field.value = response[field.name];
                    }
                });
                if (response.avatar) {
                    this.props.photo = `${HOST+response.avatar}`
                }
                this.setProps(this.props);
            })
    }
}