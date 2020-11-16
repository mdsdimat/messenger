import HTTPTransport, {IOptions} from "../services/transport";
import {HOST, METHODS} from "../../env";

const HANDS = {
    AVATAR: `${HOST}/api/v2/user/profile/avatar`,
    PROFILE: `${HOST}/api/v2/user/profile`,
}

export default class ProfileController {
    private requester: HTTPTransport;
    constructor() {
        this.requester = new HTTPTransport();
    }
    setAvatar(formData: FormData) {
        const url = HANDS.AVATAR;
        const options: IOptions = {
            method: METHODS.PUT,
            data: formData,
        }
        return this.requester.put(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result)
            })
    }

    changeProfile(formData: FormData) {
        const url = HANDS.PROFILE;
        const options: IOptions = {
            method: METHODS.PUT,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return this.requester.put(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }
}