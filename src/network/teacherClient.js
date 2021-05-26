import _default from "vuex"
import { request } from "./request"



export function getTeacherCourseInfo(teacherId,type) {
    return request({
        url: '/getTeacherCourseInfo',
        params: {
            teacherId,
            type
        }
    })
}