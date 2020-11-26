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
            chats: any[]
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

    constructor(props: {}) {
        super("div", props);
    }

    getCreateModelFields() {
        let renderFields: string = '';
        if (this.props.createModal.fields) {
            this.props.createModal.fields.forEach((field: any) => {
                const input = new Input(field);
                renderFields += `${input.renderToString()}`
            });
        }
        return renderFields;
    }

    getCreateModelButtons() {
        let renderFields: string = '';
        if (this.props.createModal.buttons) {
            this.props.createModal.buttons.forEach((field: any) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getCreateChatModal() {
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

    getDeleteModal() {
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

    getDeleteModalButtons() {
        let renderFields: string = '';
        if (this.props.deleteModal.buttons) {
            this.props.deleteModal.buttons.forEach((field: any) => {
                const button = new Button(field);
                renderFields += button.renderToString();
            });
        }
        return renderFields;
    }

    getTemplate() {
        const list = new ChatList(this.props.list);
        const body = new ChatBody(this.props.body);
        return '<main class="chat">' +
                this.getDeleteModal() +
                this.getCreateChatModal() +
                list.render()+
                body.render() +
            '  </main>';
    }
};