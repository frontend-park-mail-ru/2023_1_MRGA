export class Ajax {
    static async ajax(url, method, headers, data) {
        return await fetch(url, {
            method: method,
            credentials: 'include',
            headers: headers,
            body: data,
            mode: "cors"
        })
    }
}
