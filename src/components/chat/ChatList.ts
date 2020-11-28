import ChatListItem from "components/chat/ChatListItem";
import Button from "components/form/Button";
import Block from "modules/Block";
import style from "css/chat.css";

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
        return `<div class="${style.chatList}">
                    <header class="${style.chatListHeader}">
                        <div class="${style.flexContainer}">
                            ${this.getProfileButton()}
                            ${this.getCreateChatButton()}
                        </div>
                        <input type="text" name="search" class="${style.chatListHeaderProfileSearch}" placeholder="Поиск">
                    </header>
                    <div class="${style.chatListBody}">
                        <ul class="${style.chatListBodyCommon}">
                            ${this.getChatsList()}
                        </ul>
                    </div>
                </div>`;
    }
}