import ChatBodyHeader from "components/chat/ChatBodyHeader";
import ChatBodyMain from "components/chat/ChatBodyMain";
import ChatBodyFooter from "components/chat/ChatBodyFooter";
import Block from "modules/Block";

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
        return `<div class="chat-body">
                {{#if isShow}}
                    ${header.renderToString()}
                    ${body.renderToString()}
                    ${footer.renderToString()}
                {{else}}
                  <p class="chat-body_central-text">Выберете чат чтобы отправить сообщение</p>
                {{/if}}
                </div>`;
    }
}