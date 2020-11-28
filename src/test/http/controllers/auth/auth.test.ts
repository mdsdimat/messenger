import AuthController from "../../../../http/controllers/AuthController";
import {STATUS_TEXTS} from "modules/constants";
import {transformDataForRequest} from "modules/transformDataForRequest";

let auth: AuthController;
let formData: FormData;

const users = {
    login: 'login25435234'
};

jest.mock('http/services/transport', () => {
    return jest.fn().mockImplementation(() => {
        return {
            post: (url: string, options: any) => {
                return new Promise((resolve, reject) => {
                    const {data} = options;
                    const requestData = transformDataForRequest(data, options)
                    const resultData = JSON.parse(requestData.sendData);
                    process.nextTick(() =>
                        users.login === resultData.login && url
                            ? resolve({responseText: STATUS_TEXTS.OK})
                            : reject({responseText: {
                                    reason: "Login or password is incorrect"
                                }
                            }),
                    );
                });
            }
        };
    });
});

beforeEach(() => {
    auth = new AuthController();
    formData = new FormData();
})

test('auth', async () => {
    const login = 'login25435234';
    formData.append('login', login);
    formData.append('password', 'passw');
    await auth.login(formData)
        .then((res: XMLHttpRequest) => {
            expect(res.responseText).toEqual('OK');
        })
})