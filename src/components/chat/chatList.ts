/// <reference path="../../../globals.d.ts" />

import Block from "../../modules/block.js";

export default class ChatList extends Block {

    constructor(props: {}) {
        super("div", props);
    }

    getTemplate() {
        return '<div class="chat_list">\n' +
            '        <header class="chat_list_header">\n' +
            '            <div class="flex-container">\n' +
            '                <a class="chat_list_header_profile-link">Профиль</a>\n' +
            '            </div>\n' +
            '            <input type="text" name="search" class="chat_list_header_profile-search" placeholder="Поиск">\n' +
            '        </header>\n' +
            '        <div class="chat_list_body">\n' +
            '            <ul class="chat_list_body_common">\n' +
            '            {{#each users}}\n' +
            '                <li class="chat_list_body_item">\n' +
            '                    <div class="chat_list_body_item_photo">\n' +
            '                        <img src="img/icons/ellipse.svg">\n' +
            '                    </div>\n' +
            '                    <div class="chat_list_body_item_message">\n' +
            '                        <div class="chat_list_body_item_message_name">{{this.name}}</div>\n' +
            '                        <div class="chat_list_body_item_message_content">{{this.text}}</div>\n' +
            '                    </div>\n' +
            '                    <div class="chat_list_body_item_desc">\n' +
            '                        <div class="chat_list_body_item_desc_date">{{this.time}}</div>\n' +
            '                        {{#if this.count}}\n' +
            '                           <div class="chat_list_body_item_desc_count">{{this.count}}</div>\n' +
            '                        {{/if}}\n' +
            '                    </div>\n' +
            '                </li>\n' +
            '            {{/each}}\n' +
            '            </ul>\n' +
            '        </div>\n' +
            '    </div>';
    }
};