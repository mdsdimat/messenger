import {ROUTES} from "modules/constants";
import MainChat from "views/Chat";
import ChangeProfile from "views/ChangeProfile";
import ViewProfile from "views/Profile";
import {ServerErrorPage} from "views/500";
import {NotFoundPage} from "views/404";
import Login from "views/Login";
import Signin from "views/Signin";
import Router from "modules/routing/Router";

const router = new Router('.app');

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

const path = router.getSavePath();
if (path) {
    router.go(path)
} else {
    router.go('#/');
}


