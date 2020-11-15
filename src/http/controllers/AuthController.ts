import HTTPTransport, {
    IOptions,
    METHODS,
    STATUS_TEXTS
} from "../services/transport";
import Router from "../../modules/routing/router";
import {ROUTES} from "../../routes";
import {HOST} from "../../env";

export default class AuthController {
    private host: string;
    constructor() {
        this.host = HOST;
    }
    signin(formData: FormData | undefined) {
        const requester = new HTTPTransport();
        const url =`${HOST}/api/v2/auth/signup`;
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }

    login(formData: FormData | undefined): any {
        const url = `${this.host}/api/v2/auth/signin`;
        const requester = new HTTPTransport();
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return requester.post(url, options)
            .then((result: XMLHttpRequest):any => {
                if (result.responseText === STATUS_TEXTS.OK) {
                    return this.getUser()
                        .then((result: XMLHttpRequest) => {
                            this.redirectToChat(result)
                            return result.responseText;
                        })
                }
                return result.responseText;
            })
    }

    getUser() {
        const requester = new HTTPTransport();
         return requester.get(`${this.host}/api/v2/auth/user`)
             .catch(error => {
                 console.log(error)
             })
    }

    redirectToChat(result: XMLHttpRequest) {
        if (result.status === 200) {
            const router = new Router();
            router.go(ROUTES.CHAT);
        }
    }

    logout() {
        const requester = new HTTPTransport();
        return requester.post(`${this.host}/api/v2/auth/logout`);
    }
}