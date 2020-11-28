import {LOCAL_STORAGE} from "modules/constants";
import Chat from "components/chat/Chat";
import {getFormData} from "modules/scripts";
import ChatController from "http/controllers/ChatController";
import Router from "modules/routing/Router";
import chatStyle from "css/chat.css";

export default class MainChat extends Chat {
    constructor() {
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
        const addUser = () =>  {
            const userId = <HTMLInputElement>document.getElementById('user_id')
            if (userId && this.props.activeChat !== null) {
                const sendData = {
                    users: [userId.value],
                    chatId: Number(this.props.activeChat)
                }
                const chat = new ChatController();
                chat.addUser(sendData)
                    .then(() => {
                        this.props.addUserModal.isShow = false;
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
        const props = {
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
                buttonsClassName: chatStyle.modalWindowButtons,
                buttons: [
                    {
                        type: 'submit',
                        className: chatStyle.modalWindowButtonsError,
                        text: 'Создать',
                        action: createChat
                    },
                    {
                        className: chatStyle.modalWindowButtonsCancel,
                        text: 'Закрыть',
                        action: () => {
                            this.props.createModal.isShow = false;
                            this.setProps(this.props);
                        }
                    }
                ],

            },
            addUserModal: {
                isShow: false,
                formClassName: 'js-form-add-modal',
                fields: [
                    {
                        id: 'user_id',
                        label: 'Пользователь',
                        name: 'user',
                        className: '',
                        type: 'text',
                    },
                ],
                buttonsClassName: chatStyle.modalWindowButtons,
                buttons: [
                    {
                        type: 'submit',
                        className: chatStyle.modalWindowButtonsError,
                        text: 'Добавить',
                        action: addUser
                    },
                    {
                        className: chatStyle.modalWindowButtonsCancel,
                        text: 'Закрыть',
                        action: () => {
                            this.props.addUserModal.isShow = false;
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
                        className: chatStyle.modalWindowButtonsError,
                        text: 'Удалить',
                        action: deleteChat
                    },
                    {
                        className: chatStyle.modalWindowButtonsCancel,
                        text: 'Закрыть',
                        action: () => {
                            this.props.deleteModal.isShow = false;
                            this.setProps(this.props);
                        }
                    }
                ],
            },
            list: {
                chats: [],
                profileButton: {
                    className: chatStyle.chatListHeaderProfileLink,
                    text: 'Профиль',
                    action: () => {
                        const router = new Router();
                        router.go("#/profile");
                    }
                },
                createChatButton: {
                    className: chatStyle.chatListHeaderProfileLink,
                    text: 'Добавить чат',
                    action: () => {
                        this.props.createModal.isShow = true;
                        this.setProps(this.props);
                    }
                }
            },
            body: {
                isShow: false,
                header: {
                    name: 'Андрей',
                    desc: 'Был в сети 5 минут назад',
                    isShowMenu: false,
                    menuButton: {
                        className: chatStyle.chatBodyHeaderMenuButton,
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
                                        this.props.addUserModal.isShow = true;
                                        this.setProps(this.props);
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
                    messages: []
                },
                footer: {
                    message: {
                        id: 'message',
                        name: 'message',
                        className: chatStyle.chatBodyFooterMessageInput,
                        placeholder: 'Сообщение'
                    },
                    sendButton: {
                        className: chatStyle.chatBodyFooterSendButton,
                        action: () => {
                            const message = <HTMLInputElement>document.getElementById('message')
                            if (message !== null && this.props.activeSocket !== null) {
                                this.props.activeSocket.send(JSON.stringify({
                                    content: message.value,
                                    type: 'message',
                                }));
                            }
                        }
                    }
                }
            }
        };
        super(props);
    }

    componentDidMount(): void {
        this.getChatList()

    }

    getChatList(): void {
        const chatController = new ChatController();
        chatController.getChats()
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
                                this.props.body.isShow = true;
                                this.setProps(this.props);
                                this.startMessaging(chatController, id);
                            }
                        }
                    })
                });
                this.setProps(this.props)
            })
    }

    startMessaging(chatController: ChatController, id: number): void {
        chatController.getChatToken(id.toString())
            .then((res: XMLHttpRequest) => {
                const response = JSON.parse(res.response);
                this.props.activeToken = response.token;
                this.props.activeSocket = this.createSocket(response.token);
                this.setProps(this.props);
            })
    }

    createSocket(token:number): WebSocket {
        const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${this.props.activeChat}/${token}`);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            this.getMessagesData(event.data);
        });

        socket.addEventListener('error', (event: any) => {
            console.log('Ошибка', event.message);
        });

        return socket;
    }

    getMessagesData(stringData: string): void {
        const data = JSON.parse(stringData);
        if (Array.isArray(data)){
            const reversed = data.reverse();
            reversed.forEach(element => {
                this.addMessage(element)
            });
        } else {
            this.addMessage(data);
        }
        this.setProps(this.props);
    }

    addMessage(element: {user_id?: number, userId?: number, content: string, time: string }): void {
        const date = new Date(element.time);
        const userId = element.user_id?element.user_id:element.userId;
        const message = {
            self: userId === Number(localStorage.getItem(LOCAL_STORAGE.USER_ID)),
            text: element.content,
            time: `${date.getHours()}:${date.getMinutes()}`
        }
        this.props.body.body.messages.push(message)
    }
}