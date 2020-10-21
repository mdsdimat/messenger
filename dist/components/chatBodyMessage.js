/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
export default class ChatBodyMessage extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }
    getTemplate() {
        return '<div class="chat-body_main_message">\n' +
            '                {{#if self}}\n' +
            '                  <div class="flex-container">\n' +
            '                    <div class="chat-body_main_message-self">\n' +
            '                      <p class="chat-body_main_message_text">{{text}}</p>\n' +
            '                      <div class="chat-body_main_message_time">{{time}}</div>\n' +
            '                    </div>\n' +
            '                  </div>' +
            '                {{else}}\n' +
            '                  <p class="chat-body_main_message_text">{{text}}</p>\n' +
            '                  <div class="chat-body_main_message_time">{{time}}</div>\n' +
            '                {{/if}}\n' +
            '            </div>';
    }
    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
}
;
//# sourceMappingURL=chatBodyMessage.js.map