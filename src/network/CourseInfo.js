import _default from "vuex"
import { request } from "./request"

export function getCourseInfoList(selectCourseInfoByType) {
    return request({
        url: '/getCourseInfoList',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectCourseInfoByType,
    })
}

export function addCourseInfo(courseInfoVo) {
    return request({
        url: '/addCourseInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: courseInfoVo,
    })
}

export function getAbleDeptListForCourseInfo(type) {
    return request({
        url: '/getAbleDeptListForCourseInfo',
        params:{
            type
        }
    })
}

export function modifyCourseInfo(twoCourseInfoVo) {
    return request({
        url: '/modifyCourseInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: twoCourseInfoVo,
    })
}

export function removeCourseInfo(list) {
    return request({
        url: '/removeCourseInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}

export class  SelectCourseInfoByType{
    constructor(page, items, courseName, type, deptName) {
        this.page = page;
        this.items = items;
        this.courseName = courseName;
        this.type = type;
        this.deptName = deptName
    }
}