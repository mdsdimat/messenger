import Profile from "components/Profile";
import AuthController from "http/controllers/AuthController";
import Router from "modules/routing/Router";
import {ROUTES, STATUS_TEXTS} from "modules/constants";
import style from "css/profile.css";

export default class ViewProfile extends Profile {
    constructor() {
        const router = new Router();
        const props = {
            photo: 'img/profilePhoto.svg',
            name: 'Дима',
            backButton: {
                className: style.back,
                action: () => {
                    const router = new Router();
                    router.go(ROUTES.CHAT);
                }
            },
            formClassName: `${style.profileForm} ${style.form} js-form`,
            fields: [
                {
                    name: 'email',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Почта',
                },
                {
                    name: 'login',
                    className: style.fieldInput,
                    type: 'text',
                    placeholder: 'Логин',
                }
            ],
            buttonsClassName: '',
            buttons: [
                {
                    className: style.fieldButton,
                    type: 'submit',
                    text: 'Изменить данные',
                    parentClass: style.fieldBorder,
                    action: () => {
                        router.go(ROUTES.EDIT_PROFILE)
                    }
                },
                {
                    className: `${style.fieldButton} ${style.buttonError}`,
                    text: 'Выйти',
                    action: () => {
                        const auth = new AuthController();
                        auth.logout()
                            .then((res: XMLHttpRequest) => {
                                if (res.responseText === STATUS_TEXTS.OK) {
                                    router.go(ROUTES.LOGIN)
                                } else {
                                    router.go(ROUTES.LOGIN)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                router.go(ROUTES.LOGIN)
                            })
                    }
                },
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
                    if (field.name === 'email') {
                        field.value = response.email;
                    }
                    if (field.name === 'login') {
                        field.value = response.login;
                    }
                });
                this.setProps(this.props);
            })
            .catch(err => {
                console.log(err)
            })
    }
}