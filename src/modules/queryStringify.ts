interface IData {
    [key: string]: any
}

export function queryStringify(data?: IData): string {
    if (data === undefined) {return ''}
    if (Object.keys(data).length > 0) {
        const queryString: string = Object.entries(data).reduce((accumulator, [key, value]) => {
            accumulator += `${key}=${value}&`;
            return accumulator;
        }, '?');
        return queryString.slice(0, -1);
    }
    return '';
}