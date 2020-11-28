import Input from "components/form/Input";
import Button from "components/form/Button";
import Block from "modules/Block";
import style from "css/chat.css";

export default class ChatBodyFooter extends Block {
    props: {
        message: Record<string, unknown>,
        sendButton: Record<string, unknown>
    }

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getTemplate(): string {
        const input = new Input(this.props.message);
        const button = new Button(this.props.sendButton);
        return `<footer class="${style.chatBodyFooter}">
                            {{#if isShowMenu}}
                            <div class="${style.chatBodyFooterMenu}">
                            <ul class="chat-body_menu-list">
                                <li>
                                    <div class="chat-body_menu-list_item">
                                        <div class="chat-body_menu-list_img">
                                            <img src="img/icons/picture.svg">
                                        </div>
                                        <div class="chat-body_menu-list_text">Изображение</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="chat-body_menu-list_item">
                                        <div class="chat-body_menu-list_img">
                                           <img src="img/icons/file.svg">
                                        </div>
                                       <div class="chat-body_menu-list_text">Файл</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="chat-body_menu-list_item">
                                        <div class="chat-body_menu-list_img">
                                            <img src="img/icons/location.svg">
                                        </div>
                                        <div class="chat-body_menu-list_text">Локация</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {{/if}}
                        <div class="${style.chatBodyFooterClip}">
                            <img src="img/icons/clip.svg" alt="">
                        </div>
                        <div class="${style.chatBodyFooterMessage}">
                            ${input.renderToString()}
                        </div>
                        <div class="${style.chatBodyFooterSend}">
                            ${button.renderToString()}
                        </div>
                    </footer>`;
    }
}