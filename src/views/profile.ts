import Profile from "../components/profile";
import AuthController from "../http/controllers/AuthController";
import Router from "../modules/routing/router";
import {ROUTES} from "../routes";
import {STATUS_TEXTS} from "../env";

export default class ViewProfile extends Profile {
    constructor(props: Record<string, unknown>) {
        const router = new Router();
        props = {
            photo: 'img/profilePhoto.svg',
            name: 'Дима',
            backButton: {
                className: 'back',
                action: () => {
                    const router = new Router();
                    router.go(ROUTES.CHAT);
                }
            },
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
                    action: () => {
                        router.go(ROUTES.EDIT_PROFILE)
                    }
                },
                {
                    className: 'field_button button-error',
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