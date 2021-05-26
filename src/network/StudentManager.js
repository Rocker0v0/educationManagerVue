import _default from "vuex"
import { request } from "./request"

export function getStudentInfo(selectStudentInfoByTypeVo) {
    return request({
        url: '/getStudentInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectStudentInfoByTypeVo,
    })
}
export function addStudentInfo(studentInfoMangerVo) {
    return request({
        url: '/addStudentInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: studentInfoMangerVo,
    })
}
export function removeStudentInfo(list) {
    return request({
        url: '/removeStudentInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}
export function getClassNameListByMaxNumber(majorName, year) {
    return request({
        url: "/getClassNameListByMaxNumber",
        params: {
            majorName, year
        }
    })
}
export function modifyStudentInfo(twoStudentInfoManagerVo) {
    console.log("bbb");
    return request({
        url: '/modifyStudentInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: twoStudentInfoManagerVo,
    })
}

export class SelectStudentInfoByTypeVo {
    constructor(page, items,year,studentId, className, studentName) {
        this.page = page;
        this.items = items;
        this.year = year;
        this.studentId = studentId;
        this.studentName = studentName;
        this.className = className
    }
}
