import {IOptions, METHODS, STATUS_TEXTS} from "../../http/services/transport";
import {transformDataForRequest} from "../../modules/transformDataForRequest";

const users = {
    login: 'login25435234'
};

export default class HTTPTransport {
    post = (url:string, options: IOptions = {method: METHODS.POST}) => {
        return this.request(url, options)
    }

    request(url, options) {
        return new Promise((resolve, reject) => {
            const {data} = options;
            const requestData = transformDataForRequest(data, options)
            process.nextTick(() =>
                users.login === requestData.sendData.login
                    ? resolve(STATUS_TEXTS.OK)
                    : reject({
                        reason: "Login or password is incorrect"
                    }),
            );
        });
    }
}