import Router from "./modules/routing/router";
import Signin from './views/signin';
import Login from "./views/login";
import NotFoundPage from "./views/404";
import ServerErrorPage from "./views/500";
import ViewProfile from "./views/profile";
import ChangeProfile from "./views/changeProfile";
import MainChat from "./views/chat";
import {ROUTES} from "./routes";

const router = new Router(".app");

router
    .use('#/', Signin)
    .use(ROUTES.SIGNIN, Signin)
    .use(ROUTES.LOGIN, Login)
    .use(ROUTES.NOT_FOUND, NotFoundPage)
    .use(ROUTES.SERVER_ERROR, ServerErrorPage)
    .use(ROUTES.PROFILE, ViewProfile)
    .use(ROUTES.EDIT_PROFILE, ChangeProfile)
    .use(ROUTES.CHAT, MainChat)
    .start();

let path = router.getSavePath();
if (path) {
    router.go(path)
} else {
    router.go("#/");
}


