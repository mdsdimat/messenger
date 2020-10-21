/// <reference path="../../globals.d.ts" />

// @ts-ignore
import Block from '/src/modules/block.js';

export default class ChatBodyMain extends Block {
    props: object;

    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }

    getMessage() {
        return '{{#if text}}\n' +
            '      <p class="chat-body_main_message_text">{{text}}</p>\n' +
            '      <div class="chat-body_main_message_time">{{time}}</div>\n' +
            '    {{/if}}\n' +
            '    {{#if img}}\n' +
            '      <img class="chat-body_main_img" src="{{img}}">\n' +
            '      <div class="chat-body_main_message_time">{{time}}</div>\n' +
            '    {{/if}}\n';
    }

    getTemplate() {
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

    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
};