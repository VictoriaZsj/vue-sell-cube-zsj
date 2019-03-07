import axios from 'axios'

const ERR_NO = 0

function get(url) {
    return function(params) {
        return axios.get(url, {
            params
        }).then((res) => {
            const { errno, data } = res.data
            if (errno === ERR_NO) {
                return data
            }
        }).catch(() => {})
    }
}

function curry(a) {
    return function(b) {
        return a + b;
    }
}

export {
    get,
    curry
}