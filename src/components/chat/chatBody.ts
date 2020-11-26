import Block from "../../modules/block";
import ChatBodyHeader from "./chatBodyHeader";
import ChatBodyMain from "./chatBodyMain";
import ChatBodyFooter from "./chatBodyFooter";

export default class ChatBody extends Block {
    props: {
        header: {},
        body: {},
        footer: {},
    };

    constructor(props: {}) {
        super("div", props);
    }

    getTemplate() {
        const header = new ChatBodyHeader(this.props.header);
        const body = new ChatBodyMain(this.props.body);
        const footer = new ChatBodyFooter(this.props.footer);
        return '<div class="chat-body">\n' +
            '    {{#if isShow}}\n' +
                    header.renderToString() +
                    body.renderToString() +
                    footer.renderToString() +
            '    {{else}}\n' +
            '      <p class="chat-body_central-text">Выберете чат чтобы отправить сообщение</p>\n' +
            '    {{/if}}\n' +
            '    </div>';
    }
};