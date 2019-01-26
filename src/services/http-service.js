import axios from 'axios';

export default class HTTPService {
    constructor(baseURL = '/', headers = {}) {
        this.http = axios.create({
            baseURL,
            headers: {
                common: {
                    ...headers.common,
                },
                post: {
                    'Content-Type': 'application/json',
                    ...headers.post,
                },
            },
        });
    }

    get(url = '', params = {}, headers = {}) {
        return this.http.get(url, { params, headers }).then(res => res.data);
    }

    post(url = '', data = {}, params = {}, headers = {}) {
        return this.http.post(url, data, { params, headers }).then(res => res.data);
    }

    put(url = '', data = {}, params = {}, headers = {}) {
        return this.http.put(url, data, { params, headers }).then(res => res.data);
    }

    patch(url = '', data = {}, params = {}, headers = {}) {
        return this.http.patch(url, data, { params, headers }).then(res => res.data);
    }

    delete(url = '', params = {}, headers = {}) {
        return this.http.delete(url, { params, headers }).then(res => res.data);
    }
}