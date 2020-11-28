import Block from "modules/Block";

export default class ChatBodyMain extends Block {

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getMessage(): string {
        return `{{#if text}}
                  <p class="chat-body_main_message_text">{{text}}</p>
                  <div class="chat-body_main_message_time">{{time}}</div>
                {{/if}}
                {{#if img}}
                  <img class="chat-body_main_img" src="{{img}}" alt="">
                  <div class="chat-body_main_message_time">{{time}}</div>
                {{/if}}`;
    }

    getTemplate(): string {
        return `<div class="chat-body_main">
                        {{#each messages}}
                            {{#if self}}
                              <div class="flex-container">
                                <div class="chat-body_main_message-self">
                                    ${this.getMessage()}
                                </div>
                              </div>
                            {{else}}
                              <div class="chat-body_main_message">
                                    ${this.getMessage()}
                              </div>
                            {{/if}}
                        {{/each}}
                    </div>`;
    }
}