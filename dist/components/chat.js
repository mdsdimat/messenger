/// <reference path="../../globals.d.ts" />
// @ts-ignore
import Block from '/src/modules/block.js';
import ChatList from "./chatList.js";
import ChatBody from "./chatBody.js";
export default class Chat extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }
    getTemplate() {
        // @ts-ignore
        const list = new ChatList(this.props.list);
        // @ts-ignore
        const body = new ChatBody(this.props.body);
        return '<main class="chat">' +
            list.render() +
            body.render() +
            '</main>';
    }
    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
}
;
//# sourceMappingURL=chat.js.map