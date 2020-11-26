import Block from "../../modules/block";
import Button from "../form/button";
import ChatListItem from "./chatListItem";

export default class ChatList extends Block {
    props: {
        profileButton: Record<string, unknown>,
        createChatButton: Record<string, unknown>,
        chats: []
    };
    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getProfileButton(): string {
        const button = new Button(this.props.profileButton);
        return button.renderToString();
    }

    getCreateChatButton(): string {
        const button = new Button(this.props.createChatButton);
        return button.renderToString();
    }

    getChatsList(): string {
        let renderField = '';
        this.props.chats.forEach((field: Record<string, unknown>) => {
            const listItem = new ChatListItem(field);
            renderField += listItem.renderToString();
        })
        return renderField;
    }

    getTemplate(): string {
        return '<div class="chat_list">\n' +
            '        <header class="chat_list_header">\n' +
            '            <div class="flex-container">\n' +
                            this.getProfileButton() +
                            this.getCreateChatButton() +
            '            </div>\n' +
            '            <input type="text" name="search" class="chat_list_header_profile-search" placeholder="Поиск">\n' +
            '        </header>\n' +
            '        <div class="chat_list_body">\n' +
            '            <ul class="chat_list_body_common">\n' +
                            this.getChatsList() +
            '            </ul>\n' +
            '        </div>\n' +
            '    </div>';
    }
}