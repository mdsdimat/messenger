import Chat from "../components/chat/chat";
import Router from "../modules/routing/router";
import ChatController from "../http/controllers/ChatController";
import {getFormData} from "../modules/scripts";

export default class MainChat extends Chat {
    constructor(props: Record<string, unknown>) {
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
                    .catch((err) => {
                        //механизм вывода ошибк пользователю
                        console.log(err)
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
                    .catch(err => {
                        console.log(err)
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
                                            .catch(err => {
                                                console.log(err)
                                            })
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
                            text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической\n',
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

    componentDidMount(): void {
        this.getChatList()
    }

    getChatList(): void {
        const chat = new ChatController();
        chat.getChats()
            .then((res: XMLHttpRequest) => {
                const response = JSON.parse(res.response);
                this.props.list.chats = [];
                response.forEach((chat: Record<string, unknown>) => {
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