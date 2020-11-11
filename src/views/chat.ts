import Chat from "../components/chat/chat.js";
import Router from "../modules/routing/router.js";
import ChatController from "../http/controllers/ChatController";
import {getFormData} from "../modules/scripts";

export default class MainChat extends Chat {
    constructor(props: {}) {
        props = {
            createModal: {
                isShow: false,
                formClassName: 'js-form-create-modal',
                fields: [
                    {
                        label: 'название',
                        name: 'title',
                        className: '',
                        type: 'text',
                    },
                ],
                buttonsClassName: 'modal-window_buttons',
                buttons: [
                    {
                        type: 'submit',
                        className: 'modal-window_buttons_error',
                        text: 'Создать',
                        action: () => {
                            const formData = getFormData('js-form-create-modal');
                            if (formData) {
                                const chat = new ChatController();
                                chat.createChat(formData)
                                    .then(() => {
                                        this.props.createModal.isShow = false;
                                        this.setProps(this.props);
                                        this.getChatList();
                                    })
                            }
                        }
                    },
                    {
                        className: 'modal-window_buttons_cancel',
                        text: 'Закрыть',
                        action: () => {
                            this.props.createModal.isShow = false;
                            this.setProps(this.props);
                        }
                    }
                ],

            },
            deleteModal: {
                isShow: true,
                buttons: [
                    {
                        type: 'submit',
                        className: 'modal-window_buttons_error',
                        text: 'Удалить',
                        action: () => {
                            console.log(34534)
                        }
                    },
                    {
                        className: 'modal-window_buttons_cancel',
                        text: 'Закрыть',
                        action: () => {
                            this.props.deleteModal.isShow = false;
                            this.setProps(this.props);
                        }
                    }
                ],
            },
            list: {
                users: [
                    {
                        name: 'Андрей',
                        text: 'Сообщение',
                        time: '11:15',
                    },
                    {
                        name: 'Валера',
                        text: 'Как дела?',
                        time: '11:15',
                        count: 2,
                    },
                    {
                        name: 'Сергей',
                        text: 'Нормально',
                        time: '11:15',
                    },
                ],
                profileButton: {
                    className: 'chat_list_header_profile-link',
                    text: 'Профиль',
                    action: () => {
                        const router = new Router();
                        router.go("#/profile");
                    }
                },
                createChatButton: {
                    className: 'chat_list_header_profile-link',
                    text: 'Добавить чат',
                    action: () => {
                        this.props.createModal.isShow = true;
                        this.setProps(this.props);
                    }
                }
            },
            body: {
                isShow: true,
                header: {
                    name: 'Андрей',
                    desc: 'Был в сети 5 минут назад'
                },
                body: {
                    messages: [
                        {
                            self: false,
                            text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической\n' +
                                '                    истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n' +
                                '                    Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер\n' +
                                '                    все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
                                '\n' +
                                '                    Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда\n' +
                                '                    и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000\n' +
                                '                    евро.',
                            time: '11:56'
                        },
                        {
                            self: false,
                            img: 'img/jonas-allert-Rpz-455NaQw-unsplash.jpg',
                            time: '11:56'
                        },
                        {
                            self: true,
                            text: 'Круто!',
                            time: '11:56'
                        }
                    ]
                }
            }
        };
        super(props);
    }

    componentDidMount() {
        this.getChatList()
    }

    getChatList() {
        const chat = new ChatController();
        chat.getChats()
            .then((res: XMLHttpRequest) => {
                const response = JSON.parse(res.response);
                this.props.list.users = [];
                response.forEach((chat: any) => {
                    this.props.list.users.push({
                        id: chat.id,
                        name: chat.title,
                        avatar: chat.avatar,
                    })
                });
                this.setProps(this.props)
            })
    }
}