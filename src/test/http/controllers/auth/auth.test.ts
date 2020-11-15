jest.mock('transport');

import AuthController from "../../../../http/controllers/AuthController";

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
            expect(res.responseText).toEqual('OK');
        })
})