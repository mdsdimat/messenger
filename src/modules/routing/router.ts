// import Block from "../block.js";
import Route from "./route.js";

export default class Router {
    private static __instance: Router;
    private routes: any[];
    private history: History;
    private _currentRoute: Route|null;
    private _rootQuery: string;
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

// const router = new Router(".app");
// //
// // Можно обновиться на /user и получить сразу пользователя
// router
//     .use("/", Chats)
//     .use("/users", Users)
//     .start();

// // Через секунду контент изменится сам, достаточно дернуть переход
// setTimeout(() => {
//     router.go("/users");
// }, 1000);
//
// // А можно и назад
// setTimeout(() => {
//     router.back();
// }, 3000);
//
// // И снова вперед
// setTimeout(() => {
//     router.forward();
// }, 5000);