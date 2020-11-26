import {IOptions} from "../http/services/transport";

export function transformDataForRequest(data:any, options: IOptions) {
    let contentType = null;
    let sendData: any = data;
    if (options.headers && options.headers['Content-Type']) {
        contentType = options.headers['Content-Type'];
        if (contentType === 'application/json') {
            sendData = formDataToJson(data);
        }
    }

    return {
        contentType: contentType,
        sendData: sendData
    }
}

function formDataToJson(formData: FormData) {
    const object: any = {};
    formData.forEach((value, key) => {object[key] = value});
    return  JSON.stringify(object);
}