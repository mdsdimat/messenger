// import Block from "../block.js";
import Route from "./route.js";

export default class Router {
    private static __instance: Router;
    private routes: any[];
    private history: History;
    private _currentRoute: Route|null;
    private readonly _rootQuery: string;
    constructor(rootQuery: string = '.app') {
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
        this.history.pushState({ prevUrl: this._currentRoute?this._currentRoute.getPathName():null }, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        if (this.history.state.prevUrl) {
            this.go(this.history.state.prevUrl)
        }
    }

    forward() {
        window.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}