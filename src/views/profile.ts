import Profile from "../components/profile.js";
import HTTPTransport, {HOST} from "../http/services/transport.js";
import AuthController from "../http/controllers/AuthController";
import Router from "../modules/routing/router";
import {ROUTES} from "../routes";

export default class ViewProfile extends Profile {
    constructor(props: {}) {
        const router = new Router();
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
                    action: () => {
                        const requester = new HTTPTransport();
                        requester.post(`${HOST}/api/v2/auth/logout`);
                    }
                },
            ],
            actions: {
                submit: () => {
                    router.go(ROUTES.EDIT_PROFILE)
                }
            }
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