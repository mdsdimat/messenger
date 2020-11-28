import {queryStringify} from "modules/queryStringify";

test('check transform data to query string', () => {
    expect(queryStringify({a: 1, b: 'b', c: 'test'})).toEqual('?a=1&b=b&c=test')
    expect(queryStringify()).toEqual('')
    expect(queryStringify({})).toEqual('')
})