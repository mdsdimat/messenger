import Block from "../modules/block";

export default class ErrorPage extends Block {

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getTemplate(): string {
        return '<main class="error-page">\n' +
            '        <h1 class="error-page_number">{{text}}</h1>\n' +
            '        <p class="error-page_desc">{{desc}}</p>\n' +
            '        <a href="/" class="error-page_link">{{linkText}}</a>\n' +
            '    </main>';
    }
}