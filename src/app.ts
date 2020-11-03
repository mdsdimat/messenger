import Router from "./modules/routing/router.js";
import Signin from './views/signin.js';
import Login from "./views/login.js";
import NotFoundPage from "./views/404.js";
import ServerErrorPage from "./views/500.js";
import ViewProfile from "./views/profile.js";
import ChangeProfile from "./views/changeProfile.js";

const router = new Router(".app");

router
    .use("#/signin", Signin)
    .use("#/login", Login)
    .use("#/404", NotFoundPage)
    .use("#/500", ServerErrorPage)
    .use("#/profile", ViewProfile)
    .use("#/edit-profile", ChangeProfile)
    .start();

router.go("#/signin");


