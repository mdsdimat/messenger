import Profile from "../components/profile";
import HTTPTransport, {HOST} from "../http/services/transport";
import AuthController from "../http/controllers/AuthController";
import Router, {STORAGE} from "../modules/routing/router";
import {ROUTES} from "../routes";

export default class ViewProfile extends Profile {
    constructor(props: {}) {
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
                        const requester = new HTTPTransport();
                        requester.post(`${HOST}/api/v2/auth/logout`)
                            .then(() => {
                                localStorage.removeItem(STORAGE.SAVE_PATH);
                                router.go('#/');
                            })
                    }
                },
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
                    if (field.name === 'email') {
                        field.value = response.email;
                    }
                    if (field.name === 'login') {
                        field.value = response.login;
                    }
                });
                this.setProps(this.props);
            })
    }
}