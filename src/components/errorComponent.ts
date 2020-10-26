/// <reference path="../../globals.d.ts" />

import Block from "../modules/block.js";

export default class ErrorPage extends Block {

    constructor(props: {}) {
        super("div", props);
    }

    getTemplate() {
        return '<main class="error-page">\n' +
            '        <h1 class="error-page_number">{{text}}</h1>\n' +
            '        <p class="error-page_desc">{{desc}}</p>\n' +
            '        <a href="/" class="error-page_link">{{linkText}}</a>\n' +
            '    </main>';
    }
};