import AuthController from "../../../../http/controllers/AuthController";
import any = jasmine.any;

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
        .then((res: string) => {
            expect(JSON.parse(res)).toEqual({
                avatar: any(String),
                display_name: any(String),
                email: any(String),
                first_name: any(String),
                id: any(Number),
                login: login,
                phone: any(String),
                second_name: any(String)
            })
            return res;
        })
})