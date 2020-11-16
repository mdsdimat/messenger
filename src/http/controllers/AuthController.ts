import HTTPTransport, {
    IOptions
} from "../services/transport";
import {HOST, METHODS} from "../../env";

const HANDS = {
    SIGNUP: `${HOST}/api/v2/auth/signup`,
    SIGNIN: `${HOST}/api/v2/auth/signin`,
    GETUSER: `${HOST}/api/v2/auth/user`,
    LOGOUT: `${HOST}/api/v2/auth/logout`
}

export default class AuthController {
    private requester: HTTPTransport;
    constructor() {
        this.requester = new HTTPTransport();
    }
    signup(formData: FormData | undefined) {
        const url = HANDS.SIGNUP;
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return this.requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }

    login(formData: FormData | undefined): any {
        const url = HANDS.SIGNIN;
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return this.requester.post(url, options)
    }

    getUser() {
         return this.requester.get(HANDS.GETUSER)
             .catch(error => {
                 console.log(error)
             })
    }

    logout() {
        return this.requester.post(HANDS.LOGOUT);
    }
}