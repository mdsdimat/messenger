import ErrorPage from "../components/errorComponent.js";

export default class ServerErrorPage extends ErrorPage {
    constructor(props: {}) {
        props = {
            text: '500',
            desc: 'Мы уже фиксим',
            linkText: 'Назад к чатам'
        };
        super(props);
    }
}