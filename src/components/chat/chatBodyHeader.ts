import Input from "components/form/Input";
import HeaderMenuItem from "components/chat/HeaderMenuItem";
import Button from "components/form/Button";
import Block from "modules/Block";


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
        return `<header class="chat-body_header">
                        {{#if isRename}}
                            ${this.getHeaderInput()}
                        {{else}}
                          <div class="chat-body_header_photo">
                              <img src="img/icons/little_ellipse.svg" alt="">
                          </div>
                          <div class="chat-body_header_desc">
                              <div class="chat_list_body_item_message_name">{{name}}</div>
                              <div class="chat_list_body_item_message_content">{{desc}}</div>
                          </div>
                        {{/if}}
                          <div class="chat-body_header_menu">
                        {{#if isShowMenu}}
                            <div class="chat-body_header_menu_list">
                                <ul class="chat-body_menu-list">
                                    ${this.getMenu()}
                                </ul>
                            </div>
                        {{/if}}
                         ${this.getMenuButton()}
                        </div>
                    </header>`;
    }
}