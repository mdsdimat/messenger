import Router from "../../../modules/routing/router";
import NotFoundPage from "../../../views/404";
import {ROUTES} from "../../../routes";

let router: Router;

beforeEach(() => {
    router = new Router(".app")
})

test('router flow', () => {
    router.use(ROUTES.NOT_FOUND, NotFoundPage);
    expect(router).toEqual(new Router());
})