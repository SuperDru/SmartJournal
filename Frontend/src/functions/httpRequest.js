import * as axios from "axios";

export function httpRequest(methodType, url, headers, data = null) {
    // console.log(methodType, url, headers, data);
    const response = axios({
        method: methodType,
        url: url,
        headers: headers,
        data: data,
        validateStatus: function (status) {
            return status >= 200 & status < 400;
        }
    }).then(res => res).catch(err => {
        throw {
            data: err.response.data,
            status: err.response.status,
            statusText: err.response.statusText
        };
    });
    // console.log(response);
    return response;
}