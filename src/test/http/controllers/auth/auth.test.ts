import AuthController from "../../../../http/controllers/AuthController";
import {STATUS_TEXTS} from "../../../../http/services/transport";

let auth: AuthController;
let formData: FormData;

beforeEach(() => {
    auth = new AuthController();
    formData = new FormData();
})

test('auth', async () => {
    const login = 'login25435234';
    formData.append('login', login);
    formData.append('password', 'passw');
    await auth.login(formData)
        .then((res:any) => {
            expect(res.responseText).toEqual(STATUS_TEXTS.OK);
        })
})