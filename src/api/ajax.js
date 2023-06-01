export class Ajax {
    static async ajax(url, method, headers, data) {
        return fetch(url, {
            method: method,
            credentials: "include",
            headers: headers,
            body: data,
            mode: "cors",
        });
    }
}
