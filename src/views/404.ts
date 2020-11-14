import ErrorPage from "../components/errorComponent";

export default class NotFoundPage extends ErrorPage {
    constructor(props: {}) {
        props = {
            text: '404',
            desc: 'Не туда попали',
            linkText: 'Назад к чатам'
        };
        super(props);
    }
}