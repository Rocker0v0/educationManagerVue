import _default from "vuex"
import { request } from "./request"

export function getAllClassRoom(selectClassRoomInfoByType) {
    return request({
        url: '/getAllClassRoom',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectClassRoomInfoByType,
    })
}
export function AddClassRoom(classRoomVo) {
    return request({
        url: '/AddClassRoom',
        headers: {
            "Content-Type": "application/json"
        },
        data: classRoomVo,
    })
}
export function removeClassRoom(list) {
    return request({
        url: '/removeClassRoom',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}
export function modifyClassRoom(twoClassRoomVo) {
    return request({
        url: '/modifyClassRoom',
        headers: {
            "Content-Type": "application/json"
        },
        data: twoClassRoomVo,
    })
}



export class SelectClassRoomInfoByType {
    constructor(page, items, classRoomId, classRoomName) {
        this.page = page;
        this.items = items;
        this.classRoomId = classRoomId;
        this.classRoomName = classRoomName;
    }
}