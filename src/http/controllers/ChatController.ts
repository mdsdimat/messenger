import HTTPTransport, {IOptions, METHODS} from "../services/transport";
import {HOST} from "../../env";

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

    deleteChat(id: string) {
        const url = `${HOST}/api/v2/chats2`
        const requester = new HTTPTransport();
        const formData = new FormData();
        formData.append('chatId', id)
        const options: IOptions = {
            method: METHODS.DELETE,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return requester.post(url, options)
    }

    getChatUserList(id: string) {
        const requester = new HTTPTransport();
        return requester.get(`${HOST}/api/v2/chats/${id}/users`)
            .catch(error => {
                console.log(error)
            })
    }

    userSearch(login: string) {
        const url = `${HOST}/api/v2/user/search`
        const requester = new HTTPTransport();
        const formData = new FormData();
        formData.append('login', login);
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