import Input from "components/form/Input";
import HeaderMenuItem from "components/chat/HeaderMenuItem";
import Button from "components/form/Button";
import Block from "modules/Block";
import style from "css/chat.css";

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
        return `<header class="${style.chatBodyHeader}">
                        {{#if isRename}}
                            ${this.getHeaderInput()}
                        {{else}}
                          <div class="${style.chatBodyHeaderPhoto}">
                              <img src="img/icons/little_ellipse.svg" alt="">
                          </div>
                          <div class="${style.chatBodyHeaderDesc}">
                              <div class="${style.chatListBodyItemMessageName}">{{name}}</div>
                              <div class="${style.chatListBodyItemMessageContent}">{{desc}}</div>
                          </div>
                        {{/if}}
                          <div class="${style.chatBodyHeaderMenu}">
                        {{#if isShowMenu}}
                            <div class="${style.chatBodyHeaderMenuList}">
                                <ul class="${style.chatBodyMenuList}">
                                    ${this.getMenu()}
                                </ul>
                            </div>
                        {{/if}}
                         ${this.getMenuButton()}
                        </div>
                    </header>`;
    }
}