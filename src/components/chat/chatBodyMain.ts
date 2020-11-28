import Block from "modules/Block";
import style from "css/chat.css";

export default class ChatBodyMain extends Block {

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getMessage(): string {
        return `{{#if text}}
                  <p class="${style.chatBodyMainMessageText}">{{text}}</p>
                  <div class="${style.chatBodyMainMessageTime}">{{time}}</div>
                {{/if}}
                {{#if img}}
                  <img class="${style.chatBodyMainImg}" src="{{img}}" alt="">
                  <div class="${style.chatBodyMainMessageTime}">{{time}}</div>
                {{/if}}`;
    }

    getTemplate(): string {
        return `<div class="${style.chatBodyMain}">
                        {{#each messages}}
                            {{#if self}}
                              <div class="${style.flexContainer}">
                                <div class="${style.chatBodyMainMessageSelf}">
                                    ${this.getMessage()}
                                </div>
                              </div>
                            {{else}}
                              <div class="${style.chatBodyMainMessage}">
                                    ${this.getMessage()}
                              </div>
                            {{/if}}
                        {{/each}}
                    </div>`;
    }
}