/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
export default class ChatBodyHeader extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }
    getTemplate() {
        return '<header class="chat-body_header">\n' +
            '            <div class="chat-body_header_photo">\n' +
            '                <img src="img/icons/little_ellipse.svg">\n' +
            '            </div>\n' +
            '            <div class="chat-body_header_desc">\n' +
            '                <div class="chat_list_body_item_message_name">{{name}}</div>\n' +
            '                <div class="chat_list_body_item_message_content">{{desc}}</div>\n' +
            '            </div>\n' +
            '            <div class="chat-body_header_menu">\n' +
            '                <img src="img/icons/ellipsis.svg">\n' +
            '            </div>\n' +
            '        </header>';
    }
    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
}
;
//# sourceMappingURL=chatBodyHeader.js.map