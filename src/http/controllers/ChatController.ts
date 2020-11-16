import HTTPTransport, {IOptions} from "../services/transport";
import {HOST, METHODS} from "../../env";

const HANDS = {
    CHATS: `${HOST}/api/v2/chats`,
}

export default class ChatController {
    private requester: HTTPTransport;
    constructor() {
        this.requester = new HTTPTransport();
    }
    getChats() {
        return this.requester.get(HANDS.CHATS)
            .catch(error => {
                console.log(error)
            })
    }

    createChat(formData: FormData) {
        const url = HANDS.CHATS
        const options: IOptions = {
            method: METHODS.POST,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return this.requester.post(url, options)
    }

    deleteChat(id: string) {
        const url = HANDS.CHATS
        const formData = new FormData();
        formData.append('chatId', id)
        const options: IOptions = {
            method: METHODS.DELETE,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return this.requester.post(url, options)
    }

    getChatUserList(id: string) {
        return this.requester.get(`${HOST}/api/v2/chats/${id}/users`)
            .catch(error => {
                //механизм вывода ошибок
                console.log(error)
            })
    }
}