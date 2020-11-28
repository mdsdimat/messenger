
import HTTPTransport, {IOptions} from "http/services/transport";
import {HOST, METHODS} from "modules/constants";

const HANDS = {
    CHATS: `${HOST}/api/v2/chats`,
    USERS: `${HOST}/api/v2/chats/users`,
}

export default class ChatController {
    private requester: HTTPTransport;
    constructor() {
        this.requester = new HTTPTransport();
    }
    getChats(): Promise<unknown> {
        return this.requester.get(HANDS.CHATS)
            .catch(error => {
                console.log(error)
            })
    }

    createChat(formData: FormData): Promise<unknown> {
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

    addUser(formData: Record<string, unknown>): Promise<unknown> {
        const url = HANDS.USERS
        const options: IOptions = {
            method: METHODS.PUT,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return this.requester.put(url, options)
    }

    deleteChat(id: string): Promise<unknown> {
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

    getChatUserList(id: string): Promise<unknown> {
        return this.requester.get(`${HOST}/api/v2/chats/${id}/users`)
            .catch(error => {
                //механизм вывода ошибок
                console.log(error)
            })
    }

    getChatToken(id: string): Promise<unknown> {
        return this.requester.post(`${HOST}/api/v2/chats/token/${id}`)
            .catch(error => {
                //механизм вывода ошибок
                console.log(error)
            })
    }
}