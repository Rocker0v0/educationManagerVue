import _default from "vuex"
import { request } from "./request"


// export function getMajorList(deptName) {
//     return request({
//         url: "/getMajorList",
//         params: {
//             deptName
//         }
//     })
// }

export function getGradeManagerAllInfo(gradeManagerSelectByType) {
    return request({
        url: '/getGradeManagerAllInfo',
        headers: {
            "Content-Type": "application/json"
        },
        data: gradeManagerSelectByType,
    })
}


export function getAllReadCourseNameInfo(teacherId,year) {
    return request({
        url: '/getAllReadCourseNameInfo',
        params:{
            teacherId,
            year
        }
    })
}

export function getAllReadClassNameInfo(year,courseName,teacherId) {
    return request({
        url: '/getAllReadClassNameInfo',
        params:{
            year,
            courseName,
            teacherId
        }
    })
}

export function removeScInfoByPrimaryIdsList(list) {
    return request({
        url: '/removeScInfoByPrimaryIdsList',
        headers: {
            "Content-Type": "application/json"
        },
        data: list,
    })
}
export function modifyScInfoByPrimaryIdsList(primaryId,grade) {
    return request({
        url: '/modifyScInfoByPrimaryIdsList',
        params: {
            primaryId,
            grade
        }    
    })
}



export class GradeManagerSelectByType {
    constructor(page, items, year, courseName,className,studentId,teacherId) {
        this.page = page;
        this.items = items;
        this.year = year;
        this.courseName = courseName;
        this.className = className;
        this.studentId = studentId;
        this.teacherId = teacherId;
    }
}

