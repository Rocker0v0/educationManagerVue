import {request} from './request.js'


export function getVerifyCode(){
    return request({
        url:'/verifyCode',
        // params:{
            
        // }
    })
}

export function getStatueCode(obj){
    return request({
        url:"/getStatueCode",
        params:{
            obj
        }
    })
}