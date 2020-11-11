import HTTPTransport, {HOST, IOptions, METHODS} from "../services/transport";

export default class ChatController {
    getChats() {
        const requester = new HTTPTransport();
        return requester.get(`${HOST}/api/v2/chats`)
            .catch(error => {
                console.log(error)
            })
    }

    createChat(formData: FormData) {
        const url = `${HOST}/api/v2/chats`
        const requester = new HTTPTransport();
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return requester.post(url, options)
    }
}