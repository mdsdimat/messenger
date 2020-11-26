import {IOptions} from "../http/services/transport";

export function transformDataForRequest(data: FormData, options: IOptions): { contentType: string, sendData: any} {
    let contentType = '';
    let sendData = {};
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
    const object: Record<string, unknown> = {};
    formData.forEach((value, key) => {object[key] = value});
    return  JSON.stringify(object);
}