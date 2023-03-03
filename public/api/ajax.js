export class Ajax {
    static async ajax(url, method, headers, data) {
        return await fetch(url, {method: method, headers: headers, body: data})
    }
}