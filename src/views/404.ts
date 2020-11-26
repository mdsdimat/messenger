import ErrorPage from "../components/errorComponent";

export default class NotFoundPage extends ErrorPage {
    constructor(props: Record<string, unknown>) {
        props = {
            text: '404',
            desc: 'Не туда попали',
            linkText: 'Назад к чатам'
        };
        super(props);
    }
}