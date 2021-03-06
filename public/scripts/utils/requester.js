class Requester {
    getJSON(url, headers) {
        headers = headers || {};

        return new Promise((resolve, reject) => {
            $.ajax({
                    url,
                    type: 'GET',
                    headers
                })
                .done(resolve)
                .fail(reject);
        });
    }

    postJSON(url, data, headers) {
        data = data || {};
        headers = headers || {};

        return new Promise((resolve, reject) => {
            $.ajax({
                    url,
                    type: "POST",
                    headers,
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    }

    putJSON(url, data, headers) {
        data = data || {};
        headers = headers || {};

        return new Promise((resolve, reject) => {
            $.ajax({
                    url,
                    type: "PUT",
                    headers,
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    }
}

const requester = new Requester();
export { requester };