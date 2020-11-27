import Block from "../../modules/block";
import Input from "../form/input";
import Button from "../form/button";

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
        return '<footer class="chat-body_footer">\n' +
            '                {{#if isShowMenu}}'+
            '                <div class="chat-body_footer_menu">\n' +
            '                <ul class="chat-body_menu-list">\n' +
            '                    <li>\n' +
            '                        <div class="chat-body_menu-list_item">\n' +
            '                            <div class="chat-body_menu-list_img">\n' +
            '                                <img src="img/icons/picture.svg">\n' +
            '                            </div>\n' +
            '                            <div class="chat-body_menu-list_text">Изображение</div>\n' +
            '                        </div>\n' +
            '                    </li>\n' +
            '                    <li>\n' +
            '                        <div class="chat-body_menu-list_item">\n' +
            '                            <div class="chat-body_menu-list_img">\n' +
            '                                <img src="img/icons/file.svg">\n' +
            '                            </div>\n' +
            '                            <div class="chat-body_menu-list_text">Файл</div>\n' +
            '                        </div>\n' +
            '                    </li>\n' +
            '                    <li>\n' +
            '                        <div class="chat-body_menu-list_item">\n' +
            '                            <div class="chat-body_menu-list_img">\n' +
            '                                <img src="img/icons/location.svg">\n' +
            '                            </div>\n' +
            '                            <div class="chat-body_menu-list_text">Локация</div>\n' +
            '                        </div>\n' +
            '                    </li>\n' +
            '                </ul>\n' +
            '            </div>\n' +
            '            {{/if}}' +
            '            <div class="chat-body_footer_clip">\n' +
            '                <img src="img/icons/clip.svg" alt="">\n' +
            '            </div>\n' +
            '            <div class="chat-body_footer_message">' +
                            input.renderToString() +
            '            </div>' +
            '            <div class="chat-body_footer_send">' +
                            button.renderToString() +
            '            </div>' +
            '        </footer>';
    }
}