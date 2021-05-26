import _default from "vuex"
import { request } from "./request"



export function getDeptNameList() {
    return request({
        url: '/getDeptNameList'
    })
}
export function getDeptNameListForStudent() {
    return request({
        url: '/getDeptNameListForStudent'
    })
}
export function getMajorList(deptName) {
    return request({
        url: "/getMajorList",
        params: {
            deptName
        }
    })
}

export function getClassNameList(majorName, year) {
    return request({
        url: "/getClassNameList",
        params: {
            majorName, year
        }
    })
}


export function getClassYearList() {
    return request({
        url: "/getClassYearList",
    })
}

export function getCourseNameList(chooseCourseFormData) {
    return request({
        url: '/getCourseNameList',
        headers: {
            "Content-Type": "application/json"
        },
        data: chooseCourseFormData,
    })
}

export function submitFormData(chooseCourseFormData) {
    return request({
        url: '/submitFormData',
        headers: {
            "Content-Type": "application/json"
        },
        data: chooseCourseFormData,
    })
}

export function getChooseCourseList(chooseCourseSelectByType) {
    return request({
        url: '/getChooseCourseList',
        headers: {
            "Content-Type": "application/json"
        },
        data: chooseCourseSelectByType,
    })
}

export function removeChooseCourseForClassList(list) {
    return request({
        url: '/removeChooseCourseForClassList',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}


export class ChooseCourseSelectByType {
    constructor(page, items, year, courseName, teacherName, className) {
        this.page = page;
        this.items = items;
        this.year = year;
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.className = className
    }
}

