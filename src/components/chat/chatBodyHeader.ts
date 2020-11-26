import Block from "../../modules/block";
import Input from "../form/input";
import HeaderMenuItem from "./headerMenuItem";
import Button from "../form/button";

export default class ChatBodyHeader extends Block {
    props: {
        isRename: boolean,
        menu: [],
        menuButton: Record<string, unknown>
    };
    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getHeaderInput(): string {
        if (this.props.isRename) {
            const input = new Input(this.props);
            return input.renderToString();
        }
        return '';
    }

    getMenu(): string {
        let renderField = '';
        this.props.menu.forEach((field: Record<string, unknown>) => {
            const listItem = new HeaderMenuItem(field);
            renderField += listItem.renderToString();
        })
        return renderField;
    }

    getMenuButton(): string {
        const button = new Button(this.props.menuButton);
        return button.renderToString();
    }

    getTemplate(): string {
        return '<header class="chat-body_header">\n' +
            '            {{#if isRename}}' +
                            this.getHeaderInput() +
            '            {{else}}' +
            '              <div class="chat-body_header_photo">\n' +
            '                  <img src="img/icons/little_ellipse.svg" alt="">\n' +
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
}