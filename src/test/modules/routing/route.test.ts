import Route from "../../../modules/routing/route";
import {ROUTES} from "../../../routes";
import NotFoundPage from "../../../views/404";

let route: Route;

beforeEach(() => {
    route = new Route(ROUTES.NOT_FOUND, NotFoundPage, {rootQuery: '.app'})
})

test('route flow', () => {
    expect(route.match(ROUTES.NOT_FOUND)).toEqual(true);
    expect(route.render()).toBeInstanceOf(NotFoundPage);
})