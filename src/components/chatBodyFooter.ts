/// <reference path="../../globals.d.ts" />

// @ts-ignore
import Block from '/src/modules/block.js';

export default class ChatBodyFooter extends Block {
    props: object;

    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }

    getTemplate() {
        return '<footer class="chat-body_footer">\n' +
            '            <div class="chat-body_footer_clip">\n' +
            '                <img src="img/icons/clip.svg">\n' +
            '            </div>\n' +
            '            <input class="chat-body_footer_message" placeholder="Сообщение">\n' +
            '        </footer>';
    }

    render() {
        return Handlebars.compile(this.getTemplate())(this.props);
    }
};