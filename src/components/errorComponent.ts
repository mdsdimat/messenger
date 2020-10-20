/// <reference path="../../globals.d.ts" />

// @ts-ignore
import Block from '/src/modules/block.js';

export default class ErrorPage extends Block {
    props: object;

    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }

    getTemplate() {
        return '<main class="error-page">\n' +
            '        <h1 class="error-page_number">{{text}}</h1>\n' +
            '        <p class="error-page_desc">{{desc}}</p>\n' +
            '        <a href="/" class="error-page_link">{{linkText}}</a>\n' +
            '    </main>';
    }

    render() {

        return Handlebars.compile(this.getTemplate())(this.props);
    }
};