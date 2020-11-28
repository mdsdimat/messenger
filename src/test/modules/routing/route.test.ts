import Route from "modules/routing/Route";
import {ROUTES} from "modules/constants";
import {NotFoundPage} from "views/404";

let route: Route;

beforeEach(() => {
    route = new Route(ROUTES.NOT_FOUND, NotFoundPage, {rootQuery: '.app'})
})

test('route flow', () => {
    expect(route.match(ROUTES.NOT_FOUND)).toEqual(true);
})