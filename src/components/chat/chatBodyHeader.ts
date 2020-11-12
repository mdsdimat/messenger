/// <reference path="../../../globals.d.ts" />

import Block from "../../modules/block.js";
import Input from "../form/input.js";
import HeaderMenuItem from "./headerMenuItem";
import Button from "../form/button";

export default class ChatBodyHeader extends Block {
    props: any;
    constructor(props: {}) {
        super("div", props);
    }

    getHeaderInput() {
        if (this.props.isRename) {
            const input = new Input(this.props);
            return input.renderToString();
        }
        return '';
    }

    getMenu() {
        let renderField = '';
        this.props.menu.forEach((field: {}) => {
            const listItem = new HeaderMenuItem(field);
            renderField += listItem.renderToString();
        })
        return renderField;
    }

    getMenuButton() {
        const button = new Button(this.props.menuButton);
        return button.renderToString();
    }

    getTemplate() {
        return '<header class="chat-body_header">\n' +
            '            {{#if isRename}}' +
                            this.getHeaderInput() +
            '            {{else}}' +
            '              <div class="chat-body_header_photo">\n' +
            '                  <img src="img/icons/little_ellipse.svg">\n' +
            '              </div>\n' +
            '              <div class="chat-body_header_desc">\n' +
            '                  <div class="chat_list_body_item_message_name">{{name}}</div>\n' +
            '                  <div class="chat_list_body_item_message_content">{{desc}}</div>\n' +
            '              </div>\n' +
            '            {{/if}}' +
            '              <div class="chat-body_header_menu">\n' +
            '            {{#if isShowMenu}}' +
            '                <div class="chat-body_header_menu_list">\n' +
            '                    <ul class="chat-body_menu-list">\n' +
                                    this.getMenu() +
            '                    </ul>\n' +
            '                </div>\n' +
            '            {{/if}}' +
                         this.getMenuButton() +
            '            </div>\n' +
            '        </header>';
    }
};