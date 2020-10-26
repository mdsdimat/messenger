import ErrorPage from "../components/errorComponent.js";
import {render} from "../modules/scripts.js"

const page = new ErrorPage({
    text: '500',
    desc: 'Мы уже фиксим',
    linkText: 'Назад к чатам'
});

render(".app", page);