import ChatBodyHeader from "components/chat/ChatBodyHeader";
import ChatBodyMain from "components/chat/ChatBodyMain";
import ChatBodyFooter from "components/chat/ChatBodyFooter";
import Block from "modules/Block";
import style from "css/chat.css";

export default class ChatBody extends Block {
    props: {
        header: Record<string, unknown>,
        body: Record<string, unknown>,
        footer: Record<string, unknown>,
    };

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getTemplate(): string {
        const header = new ChatBodyHeader(this.props.header);
        const body = new ChatBodyMain(this.props.body);
        const footer = new ChatBodyFooter(this.props.footer);
        return `<div class="${style.chatBody}">
                {{#if isShow}}
                    ${header.renderToString()}
                    ${body.renderToString()}
                    ${footer.renderToString()}
                {{else}}
                  <p class="${style.chatBodyCentralText}">Выберете чат чтобы отправить сообщение</p>
                {{/if}}
                </div>`;
    }
}