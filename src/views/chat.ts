import Chat from "../components/chat/chat";
import Router from "../modules/routing/router";
import ChatController from "../http/controllers/ChatController";
import {getFormData} from "../modules/scripts";

export default class MainChat extends Chat {
    constructor(props: {}) {
        const createChat = () =>  {
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

        const deleteChat = () => {
            if (this.props.activeChat !== null) {
                const chat = new ChatController();
                chat.deleteChat(this.props.activeChat.toString())
                    .then(() => {
                        this.props.activeChat = null;
                        this.props.deleteModal.isShow = false;
                        this.getChatList()
                    })
            }
        }

        props = {
            activeChat: null,
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
                        action: createChat
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
                isShow: false,
                buttons: [
                    {
                        type: 'submit',
                        className: 'modal-window_buttons_error',
                        text: 'Удалить',
                        action: deleteChat
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
                chats: [
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
                    desc: 'Был в сети 5 минут назад',
                    isShowMenu: false,
                    menuButton: {
                        className: 'chat-body_header_menu_button',
                        action: () => {
                            this.props.body.header.isShowMenu = !this.props.body.header.isShowMenu;
                            this.setProps(this.props);
                        }
                    },
                    menu: [
                        {
                            icon: 'img/icons/edit.svg',
                            name: 'Добавить пользователя',
                            actions: {
                                onclick: () => {
                                    if (this.props.activeChat !== null) {
                                        const chat = new ChatController();
                                        chat.getChatUserList(this.props.activeChat.toString())
                                        chat.userSearch('eantonova');
                                    }
                                }
                            }
                        },
                        {
                            icon: 'img/icons/edit.svg',
                            name: 'Изменить',
                            actions: {

                            }
                        },
                        {
                            icon: 'img/icons/delete.svg',
                            name: 'Удалить',
                            actions: {
                                onclick: () => {
                                    this.props.deleteModal.isShow = true;
                                    this.props.body.header.isShowMenu = false;
                                    this.setProps(this.props);
                                }
                            }
                        }
                    ]
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
                this.props.list.chats = [];
                response.forEach((chat: any) => {
                    this.props.list.chats.push({
                        id: chat.id,
                        name: chat.title,
                        avatar: chat.avatar,
                        actions: {
                            onclick: (id: number) => {
                                this.props.activeChat = id;
                                this.setProps(this.props);
                            }
                        }
                    })
                });
                this.setProps(this.props)
            })
    }

}