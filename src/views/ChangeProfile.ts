import Profile from "components/Profile";
import Router from "modules/routing/Router";
import {HOST, ROUTES} from "modules/constants";
import {getFormData} from "modules/scripts";
import AuthController from "http/controllers/AuthController";
import ProfileController from "http/controllers/ProfileController";
import style from "css/profile.css";

export default class ChangeProfile extends Profile {
    constructor() {
        const props = {
            photo: 'img/profilePhoto.svg',
            name: 'Дима',
            backButton: {
                className: style.back,
                action: () => {
                    const router = new Router();
                    router.go(ROUTES.PROFILE);
                }
            },
            formClassName: `${style.profileForm} ${style.form} js-form`,
            fields: [
                {
                    name: 'first_name',
                    className: style.fieldInput,
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
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Фамилия',
                    value: 'Димский',
                },
                {
                    name: 'display_name',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Отображаемое имя',
                    value: 'Dima',
                },
                {
                    name: 'login',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Логин',
                    value: 'Dima',
                },
                {
                    name: 'email',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Email',
                    value: 'test@yandex.ru',
                },
                {
                    name: 'phone',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Телфон',
                    value: '+375291234567',
                },
                {
                    name: 'avatar',
                    className: style.fieldInputFile,
                    type: 'file',
                    placeholder: 'Аватар',
                    value: '',
                    id: 'avatar',
                },
                {
                    name: 'password',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Пароль',
                    value: 'password',
                },
                {
                    name: 'confirm_password',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Пароль (ещё раз)',
                    value: 'password',
                },
            ],
            buttons: [
                {
                    className: style.profileFormSaveButton,
                    text: 'Сохранить',
                    action: () => {
                        const formData = getFormData('js-form');
                        if (formData) {
                            const profile = new ProfileController();
                            const avatar: any = formData.get('avatar');
                            if (avatar !== null && avatar.size !== 0) {
                                const avatarData = new FormData();
                                avatarData.append('avatar', avatar);
                                profile.setAvatar(avatarData)
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }
                            this.props.fields.forEach((field) => {
                                if (field.name === 'avatar') {
                                    formData.delete(field.name);
                                }
                            });
                            profile.changeProfile(formData)
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    }
                }
            ]
        };
        super(props);
    }

    componentDidMount(): void {
        const auth = new AuthController();
        auth.getUser()
            .then((result: XMLHttpRequest) => {
                const response = JSON.parse(result.response)
                const fields = this.props.fields;
                fields.forEach((field) => {
                    if (response[<string>field.name]) {
                        field.value = response[<string>field.name];
                    }
                });
                if (response.avatar) {
                    this.props.photo = `${HOST+response.avatar}`
                }
                this.setProps(this.props);
            })
            .catch(err => {
                console.log(err)
            })
    }
}