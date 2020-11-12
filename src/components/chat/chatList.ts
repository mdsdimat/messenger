/// <reference path="../../../globals.d.ts" />

import Block from "../../modules/block.js";
import Button from "../form/button.js";
import ChatListItem from "./chatListItem";

export default class ChatList extends Block {
    props: any;
    constructor(props: {}) {
        super("div", props);
    }

    getProfileButton() {
        const button = new Button(this.props.profileButton);
        return button.renderToString();
    }

    getCreateChatButton() {
        const button = new Button(this.props.createChatButton);
        return button.renderToString();
    }

    getChatsList() {
        let renderField = '';
        this.props.chats.forEach((field: {}) => {
            const listItem = new ChatListItem(field);
            renderField += listItem.renderToString();
        })
        return renderField;
    }

    getTemplate() {
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
            // '            {{#each users}}\n' +
            // '                <li id="{{this.id}}" class="chat_list_body_item">\n' +
            // '                    <div class="chat_list_body_item_photo">\n' +
            // '                        <img src="img/icons/ellipse.svg">\n' +
            // '                    </div>\n' +
            // '                    <div class="chat_list_body_item_message">\n' +
            // '                        <div class="chat_list_body_item_message_name">{{this.name}}</div>\n' +
            // '                        <div class="chat_list_body_item_message_content">{{this.text}}</div>\n' +
            // '                    </div>\n' +
            // '                    <div class="chat_list_body_item_desc">\n' +
            // '                        <div class="chat_list_body_item_desc_date">{{this.time}}</div>\n' +
            // '                        {{#if this.count}}\n' +
            // '                           <div class="chat_list_body_item_desc_count">{{this.count}}</div>\n' +
            // '                        {{/if}}\n' +
            // '                    </div>\n' +
            // '                </li>\n' +
            // '            {{/each}}\n' +
            '            </ul>\n' +
            '        </div>\n' +
            '    </div>';
    }
};