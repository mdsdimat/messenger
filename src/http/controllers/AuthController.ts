import HTTPTransport, {
    HOST, IOptions,
    METHODS,
    STATUS_TEXTS
} from "../services/transport";
import Router from "../../modules/routing/router";
import {ROUTES} from "../../routes";

export default class AuthController {
    signin(formData: FormData | undefined, url: string) {
        const requester = new HTTPTransport();
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }

    login(formData: FormData | undefined, url: string) {
        const requester = new HTTPTransport();
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                if (result.responseText === STATUS_TEXTS.OK) {
                    this.getUser()
                        .then((result: XMLHttpRequest) => {this.redirectToChat(result)})
                }
            })
    }

    getUser() {
        const requester = new HTTPTransport();
         return requester.get(`${HOST}/api/v2/auth/user`)
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
        requester.post(`${HOST}/api/v2/auth/logout`);
    }
}