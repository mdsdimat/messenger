import HTTPTransport, {IOptions, METHODS} from "../services/transport";
import {HOST} from "../../env";

export default class ProfileController {
    setAvatar(formData: FormData) {
        const requester = new HTTPTransport();
        const url = `${HOST}/api/v2/user/profile/avatar`
        const options: IOptions = {
            method: METHODS.PUT,
            data: formData,
        }
        return requester.put(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result)
            })
    }

    changeProfile(formData: FormData) {
        const requester = new HTTPTransport();
        const url = `${HOST}/api/v2/user/profile`;
        const options: IOptions = {
            method: METHODS.PUT,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return requester.put(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }
}