import Block from "modules/Block";

export default class ErrorPage extends Block {

    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    getTemplate(): string {
        return `<main class="error-page">
            '        <h1 class="error-page_number">{{text}}</h1>
            '        <p class="error-page_desc">{{desc}}</p>
            '        <a href="/" class="error-page_link">{{linkText}}</a>
                </main>`;
    }
}