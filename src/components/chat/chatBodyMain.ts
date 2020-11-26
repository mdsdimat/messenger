import Block from "../../modules/block";

export default class ChatBodyMain extends Block {

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getMessage(): string {
        return '{{#if text}}\n' +
            '      <p class="chat-body_main_message_text">{{text}}</p>\n' +
            '      <div class="chat-body_main_message_time">{{time}}</div>\n' +
            '    {{/if}}\n' +
            '    {{#if img}}\n' +
            '      <img class="chat-body_main_img" src="{{img}}" alt="">\n' +
            '      <div class="chat-body_main_message_time">{{time}}</div>\n' +
            '    {{/if}}\n';
    }

    getTemplate(): string {
        return '<div class="chat-body_main">\n' +
            '            {{#each messages}}\n' +
            '                {{#if self}}\n' +
            '                  <div class="flex-container">\n' +
            '                    <div class="chat-body_main_message-self">\n' +
                                    this.getMessage() +
            '                    </div>\n' +
            '                  </div>' +
            '                {{else}}\n' +
            '                  <div class="chat-body_main_message">\n' +
                                    this.getMessage() +
            '                  </div>\n' +
            '                {{/if}}\n' +
            '            {{/each}}\n' +
            '        </div>';
    }
}