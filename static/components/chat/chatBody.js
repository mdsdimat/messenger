/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import ChatBodyHeader from "./chatBodyHeader.js";
import ChatBodyMain from "./chatBodyMain.js";
import ChatBodyFooter from "./chatBodyFooter.js";
export default class ChatBody extends Block {
    constructor(props) {
        super("div", props);
    }
    getTemplate() {
        console.log(353452342);
        const header = new ChatBodyHeader(this.props.header);
        const body = new ChatBodyMain(this.props.body);
        const footer = new ChatBodyFooter(this.props.footer);
        return '<div class="chat-body">\n' +
            '    {{#if isShow}}\n' +
            header.render() +
            body.render() +
            footer.render() +
            '    {{else}}\n' +
            '      <p class="chat-body_central-text">Выберете чат чтобы отправить сообщение</p>\n' +
            '    {{/if}}\n' +
            '    </div>';
    }
}
;
//# sourceMappingURL=chatBody.js.map