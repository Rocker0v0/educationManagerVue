import _default from "vuex"
import { request } from "./request"

export function getClassManagerInfo(selectClassManagerInfoByType) {
    return request({
        url: '/getClassManagerInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectClassManagerInfoByType,
    })
}
export function getAbleTeacherNameList(deptName) {
    return request({
        url: '/getAbleTeacherNameList',
        params: {
            deptName
        }
    })
}
export function getMajorListByYear(deptName,year) {
    return request({
        url: '/getMajorListByYear',
        params: {
            deptName,year
        }
    })
}

export function addClassManagerList(classManagerVo) {
    return request({
        url: '/addClassManagerList',
        headers: {
            "Content-Type": "application/json"
        },
        data: classManagerVo,
    })
}
export function removeClassManagerList(list) {
    return request({
        url: '/removeClassManagerList',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}

export function modifyClassManagerList(classManagerVo) {
    console.log("bbb");
    return request({
        url: '/modifyClassManagerList',
        headers: {
            "Content-Type": "application/json"
        },
        data: classManagerVo,
    })
}
export class SelectClassManagerInfoByType {
    constructor(page, items,year,deptName, majorName) {
        this.page = page;
        this.items = items;
        this.year = year;
        this.deptName = deptName;
        this.majorName = majorName
    }
}
