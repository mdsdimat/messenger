import Sign from "../components/signin";
import {getFormData} from "../modules/scripts";
import AuthController from "../http/controllers/AuthController";
import Router from "../modules/routing/router";
import {ROUTES} from "../routes";
import {STATUS_TEXTS} from "../env";
import style from "../css/sign.css"


export default class Login extends Sign {
    constructor(props: {}) {
        props = {
            typeBackground: style.loginBackground,
            title: 'Вход',
            formClassName: 'js-form',
            fields: [
                {
                    label: 'Логин',
                    name: 'login',
                    className: style.signFormInput,
                    type: 'text',
                    value: 'login25435234',
                    validation: [
                        {
                            name: 'max',
                            value: 20,
                        },
                        {
                            name: 'required',
                        }
                    ],
                },
                {
                    label: 'Пароль',
                    name: 'password',
                    className: style.signFormInput,
                    type: 'password',
                    value: 'passw',
                    validation: [
                        {
                            name: 'required',
                        }
                    ]
                },
            ],
            buttonsClassName: style.signFormButtonBlock,
            buttons: [
                {
                    className: style.signFormButtonBlockFormSubmit,
                    text: 'Авторизоваться',
                },
                {
                    className: style.signFormButtonBlockFormCancel,
                    text: 'Нет аккаунта?',
                    action: () => {
                        const router = new Router();
                        router.go(ROUTES.SIGNIN);
                    }
                }
            ],
            actions: {
                submit: () => {
                    const formData = getFormData(this.props.formClassName)
                    const auth = new AuthController();
                    auth.login(formData)
                        .then((result: XMLHttpRequest): any => {
                            if (result.responseText === STATUS_TEXTS.OK) {
                                auth.getUser()
                                    .then((result: XMLHttpRequest) => {
                                        this.redirectToChat(result)
                                    })
                            } else {
                                const response = JSON.parse(result.response)
                                if (response.reason) {
                                    this.showUserMessage(response.reason)
                                } else {
                                    this.showUserMessage('Something wrong')
                                }
                            }
                        })
                        .catch((err: any) => {
                            console.log(err)
                        })
                }
            },
            userMessageModal: {
                isShow: false,
                text: '',
                button: {
                    type: 'submit',
                    className: 'modal-window_buttons_error',
                    text: 'Закрыть',
                    action: () => {
                        this.props.userMessageModal.isShow = false;
                        this.setProps(this.props)
                    }
                }
            }
        };
        super(props);
    }

    componentDidMount() {
        const auth = new AuthController();
        auth.getUser()
            .then((result: XMLHttpRequest) => {
                this.redirectToChat(result, true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    redirectToChat(result: XMLHttpRequest, init = false) {
        if (result.status === 200) {
            const router = new Router();
            router.go(ROUTES.CHAT);
        } else if (!init) {
            this.showUserMessage('Something wrong')
        }
    }

    showUserMessage(message: string) {
        this.props.userMessageModal.text = message;
        this.props.userMessageModal.isShow = true;
        this.setProps(this.props)
    }
}