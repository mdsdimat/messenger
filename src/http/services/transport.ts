import {queryStringify} from "../../modules/queryStringify";
import {transformDataForRequest} from "../../modules/transformDataForRequest";
import {METHODS} from "../../env";

export interface IOptions {
    headers?: {
        'Content-Type'?: string
    },
    data?: FormData,
    timeout?: number,
    method: string,
}

export default class HTTPTransport {
    get = (url: string, options: IOptions = {method: METHODS.GET}): Promise<unknown> => {
        const queryUrl = url + queryStringify(options.data)
        return this.request(queryUrl, options)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                throw new Error("Error");
            })
    };

    post = (url:string, options: IOptions = {method: METHODS.POST}): Promise<unknown> => {
        return this.request(url, options)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                throw new Error("Error");
            })
    }

    put = (url:string, options: IOptions): Promise<unknown> => {
        options.method = METHODS.PUT;
        return this.request(url, options)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                throw new Error("Error");
            })
    }

    delete = (url:string, options: IOptions): Promise<unknown> => {
        options.method = METHODS.DELETE;
        return this.request(url, options)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                throw new Error("Error");
            })
    }
    request = (url: string, options: IOptions): Promise<unknown> => {
        const {method, data} = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.setRequestHeader('accept', 'application/json');
                xhr.withCredentials = true;
                xhr.send();
            } else {
                const requestData = transformDataForRequest(data, options)
                xhr.withCredentials = true;
                if (requestData.contentType !== null) {
                    xhr.setRequestHeader('Content-Type', requestData.contentType);
                }
                xhr.send(requestData.sendData);
            }
        });
    };
}