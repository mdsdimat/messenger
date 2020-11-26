import Block from "../../modules/block";
import ChatList from "./chatList";
import ChatBody from "./chatBody";
import Input from "../form/input";
import Button from "../form/button";
import Form from "../form/form";

export default class Chat extends Block {
    props: {
        activeChat: number|null,
        list: {
            chats: Record<string, unknown>[]
        },
        body: {
            header: {
                isShowMenu: boolean
            }
        },
        createModal: {
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

    getCreateModelFields(): string {
        let renderFields = '';
        if (this.props.createModal.fields) {
            this.props.createModal.fields.forEach((field) => {
                const input = new Input(field);
                renderFields += `${input.renderToString()}`
            });
        }
        return renderFields;
    }

    getCreateModelButtons(): string {
        let renderFields = '';
        if (this.props.createModal.buttons) {
            this.props.createModal.buttons.forEach((field) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getCreateChatModal(): string {
        if (this.props.createModal.isShow) {
            const form = new Form(this.props.createModal, this.getCreateModelFields(), this.getCreateModelButtons());
            return '    <div class="modal-wrapper">\n' +
                '        <div class="modal-window">\n' +
                            form.renderToString() +
                '        </div>\n' +
                '        <div class="overlay"></div>\n' +
                '    </div>\n';
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
                list.render()+
                body.render() +
            '  </main>';
    }
}