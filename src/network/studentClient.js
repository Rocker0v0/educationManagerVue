import _default from "vuex"
import { request } from "./request"

export function getStudentCourse(studentId, semester) {
    return request({
        url: '/getStudentCourse',
        params: {
            studentId,
            semester
        }
    })
}

export function getAllGradeForStudentCli(selectStudentClientGrade) {
    return request({
        url: '/getAllGradeForStudentCli',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectStudentClientGrade
    })
}
export function getAllMyCourse(selectMyCourseVo) {
    return request({
        url: '/getAllMyCourse',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectMyCourseVo
    })
}


export function chooseMyCourse(myCourseStudentClientVo) {
    return request({
        url: '/chooseMyCourse',
        headers: {
            "Content-Type": "application/json"
        },
        data: myCourseStudentClientVo
    })
}

export function getAllAlReadingCourse(selectStudentClientGrade) {
    return request({
        url: '/getAllAlReadingCourse',
        headers: {
            "Content-Type": "application/json"
        },
        data: selectStudentClientGrade
    })
}

export function removeMyChooseCourse(myCourseStudentClientVo) {
    return request({
        url: '/removeMyChooseCourse',
        headers: {
            "Content-Type": "application/json"
        },
        data: myCourseStudentClientVo
    })
}

export class SelectStudentClientGrade {
    constructor(page, items, semester, courseName, teacherName, studentId) {
        this.page = page;
        this.items = items;
        this.semester = semester;
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.studentId = studentId;
    }
}

export class SelectMyCourse {
    constructor(page, items, courseName, teacherName, studentId) {
        this.page = page;
        this.items = items;
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.studentId = studentId;
    }
}