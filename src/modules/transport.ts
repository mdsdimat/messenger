export const METHODS = {
    GET: 'GET',
    POST: 'POST',
};

interface IOptions {
    data?: FormData,
    timeout?: number,
    method: string,
}

interface IData {
    [key: string]: any
}

function queryStringify(data: IData|undefined) {
    if (!data) {return;}
    if (Object.keys(data).length > 0) {
        let query = '?';
        for (let key in data) {
            query += `${key}=${data[key]}&`;
        }
        return query.slice(0, -1);
    }
    return;
}

function formDataToJson(formData: FormData) {
    let object: any = {};
    formData.forEach((value, key) => {object[key] = value});
    return  JSON.stringify(object);
}

export default class HTTPTransport {
    get = (url: string, options: IOptions = {method: METHODS.GET}) => {
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

    post = (url:string, options: IOptions = {method: METHODS.POST}) => {
        return this.request(url, options)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                throw new Error("Error");
            })
    }

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: IOptions) => {
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
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(formDataToJson(data));
            }
        });
    };
}