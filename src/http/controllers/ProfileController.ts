import HTTPTransport, {HOST, IOptions, METHODS} from "../services/transport";

export default class ProfileController {
    setAvatar(formData: FormData) {
        const requester = new HTTPTransport();
        const url = `${HOST}/api/v2/user/profile/avatar`
        const options: IOptions = {
            method: METHODS.PUT,
            data: formData,
        }
        requester.put(url, options)
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
        requester.put(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })
    }
}