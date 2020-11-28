import Router from "modules/routing/Router";
import {ROUTES} from "modules/constants";
import {NotFoundPage} from "views/404";

let router: Router;

beforeEach(() => {
    router = new Router(".app")
})

test('router flow', () => {
    router.use(ROUTES.NOT_FOUND, NotFoundPage);
    expect(router).toEqual(new Router());
})