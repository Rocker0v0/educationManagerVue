import _default from "vuex"
import { request } from "./request"

export function getTeacherInfo(selectTeacherInfoByTypeVo) {
    return request({
        url: '/getTeacherInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectTeacherInfoByTypeVo,
    })
}
export function addTeacherInfo(teacherInfoManagerVo) {
    return request({
        url: '/addTeacherInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: teacherInfoManagerVo,
    })
}
export function removeTeacherInfo(list) {
    return request({
        url: '/removeTeacherInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}
export function modifyTeacherInfo(twoTeacherInfoManagerVo) {
    return request({
        url: '/modifyTeacherInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: twoTeacherInfoManagerVo,
    })
}
export class SelectTeacherInfoByTypeVo {
    constructor(page, items,teacherId, teacherName, deptName) {
        this.page = page;
        this.items = items;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.deptName = deptName
    }
}

