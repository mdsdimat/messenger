import ErrorPage from "../components/errorComponent.js";
import { render } from "../modules/scripts.js";
const page = new ErrorPage({
    text: '404',
    desc: 'Не туда попали',
    linkText: 'Назад к чатам'
});
render(".app", page);
//# sourceMappingURL=404.js.map