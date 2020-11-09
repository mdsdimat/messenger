import HTTPTransport, {
    METHODS,
    STATUS_TEXTS
} from "../services/transport";

export default class AuthController {
    signin(formData: FormData | undefined, url: string) {
        const requester = new HTTPTransport();
        const options = {
            method: METHODS.POST,
            data: formData
        }
        requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }

    login(formData: FormData | undefined, url: string) {
        // const host = 'https://ya-praktikum.tech';
        const requester = new HTTPTransport();
        const options = {
            method: METHODS.POST,
            data: formData
        }
        requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                if (result.responseText === STATUS_TEXTS.OK) {
                    this.getUser();
                }
            })
    }

    getUser() {
        const requester = new HTTPTransport();
        requester.get('https://ya-praktikum.tech/api/v2/auth/user')
            .then((result) => {
                console.log(result)
            })
    }
}