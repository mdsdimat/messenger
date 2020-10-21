/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
import ChatBodyHeader from "./chatBodyHeader.js";
import ChatBodyMain from "./chatBodyMain.js";
import ChatBodyFooter from "./chatBodyFooter.js";
export default class ChatBody extends Block {
    constructor(props) {
        super("div", props);
    }
    getTemplate() {
        // @ts-ignore
        const header = new ChatBodyHeader(this.props.header);
        // @ts-ignore
        const body = new ChatBodyMain(this.props.body);
        // @ts-ignore
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
    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
}
;
//# sourceMappingURL=chatBody.js.map