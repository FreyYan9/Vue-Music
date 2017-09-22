import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        });
    })
}

export function param(data) {
    let url = ''
    for (var key in data) {
        let value = data[key] !== undefined ? data[key] : ''
        url += '&' + key + '=' + encodeURIComponent(value)
    }
    return url
}
