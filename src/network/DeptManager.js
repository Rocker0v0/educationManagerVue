import _default from "vuex"
import { request } from "./request"


export function getDeptInfoList(selectDeptManagerByType) {
    return request({
        url: '/getDeptInfoList',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectDeptManagerByType,
    })
}

export function getDeptAndMajorNameList() {
    return request({
        url: '/getDeptAndMajorNameList'
    })
}


export function addDeptInfo(deptManagerVo) {
    return request({
        url: '/addDeptInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: deptManagerVo,
    })
}

export function removeDeptInfo(list) {
    return request({
        url: '/removeDeptInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}
export function modifyDeptInfo(twoDeptManagerVo) {
    return request({
        url: '/modifyDeptInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: twoDeptManagerVo,
    })
}
export class SelectDeptManagerByType {
    constructor(page, items, deptId, parentDeptName, deptName) {
        this.page = page;
        this.items = items;
        this.deptId = deptId;
        this.parentDeptName = parentDeptName;
        this.deptName = deptName
    }
}