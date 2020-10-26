/// <reference path="../../../globals.d.ts" />
import Block from "../../modules/block.js";
import ChatList from "./chatList.js";
import ChatBody from "./chatBody.js";
export default class Chat extends Block {
    constructor(props) {
        super("div", props);
    }
    getTemplate() {
        const list = new ChatList(this.props.list);
        const body = new ChatBody(this.props.body);
        return '<main class="chat">' +
            '    {{#if isShowDeleteModal}}' +
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal-window">\n' +
            '            <p class="modal-window_title">Вы хотите удалить чат</p>\n' +
            '            <div class="modal-window_buttons">\n' +
            '                <button class="modal-window_buttons_error">Удалить</button>\n' +
            '                <button class="modal-window_buttons_cancel">Отменить</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="overlay"></div>\n' +
            '    </div>\n' +
            '    {{/if}}' +
            list.render() +
            body.render() +
            '  </main>';
    }
}
;
//# sourceMappingURL=chat.js.map