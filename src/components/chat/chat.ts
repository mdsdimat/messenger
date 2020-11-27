import Block from "../../modules/block";
import ChatList from "./chatList";
import ChatBody from "./chatBody";
import Button from "../form/button";
import Modal from "../modal";

export default class Chat extends Block {
    props: {
        activeChat: number|null,
        activeToken: string|null,
        activeSocket: WebSocket|null;
        list: {
            chats: Record<string, unknown>[]
        },
        body: {
            isShow: boolean,
            header: {
                isShowMenu: boolean
            },
            body: {
                messages: Record<string, unknown>[]
            }
        },
        createModal: {
            isShow: boolean,
            fields: [],
            buttons: [],
        },
        addUserModal: {
            isShow: boolean,
            fields: [],
            buttons: [],
        },
        deleteModal: {
            isShow: boolean,
            buttons: [],
        }
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getCreateChatModal(): string {
        if (this.props.createModal.isShow) {
            const modal = new Modal(this.props.createModal)
            return modal.renderToString();
        } else {
            return '';
        }
    }

    getAddUserModal(): string {
        if (this.props.addUserModal.isShow) {
            const modal = new Modal(this.props.addUserModal)
            return modal.renderToString();
        } else {
            return '';
        }
    }

    getDeleteModal(): string {
        if (this.props.deleteModal.isShow) {
            return '    <div class="modal-wrapper">\n' +
                '        <div class="modal-window">\n' +
                '            <p class="modal-window_title">Вы хотите удалить чат</p>\n' +
                '            <div class="modal-window_buttons">\n' +
                                this.getDeleteModalButtons() +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="overlay"></div>\n' +
                '    </div>\n';
        } else {
            return '';
        }
    }

    getDeleteModalButtons(): string {
        let renderFields = '';
        if (this.props.deleteModal.buttons) {
            this.props.deleteModal.buttons.forEach((field) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getTemplate(): string {
        const list = new ChatList(this.props.list);
        const body = new ChatBody(this.props.body);
        return '<main class="chat">' +
                this.getDeleteModal() +
                this.getCreateChatModal() +
                this.getAddUserModal() +
                list.render()+
                body.render() +
            '  </main>';
    }
}