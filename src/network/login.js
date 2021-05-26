import { request } from './request.js'


export function getVerifyCode() {
    return request({
        url: '/verifyCode',
    })
}
export function setSession(userName,passWord,code) {
    return request({
        url: "/setSession",
        params:{
            code,
            userName,
            passWord,
        },
    })
}
export function getSession(code) {
    return request({
        url: '/getSession',
        params:{
            code
        },
    })
}
export function delSession(code) {
    return request({
        url: '/delSession',
        params:{
            code
        },
    })
}
export function getStatueCode(userName,passWord,code) {
    return request({
        url: "/getStatueCode",
        params:{
            code,
            userName,
            passWord,
        },
    })
}
