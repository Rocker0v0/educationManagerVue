import _default from "vuex"
import { request } from "./request"

export function getCourseManagerMessage(page, items, type, tName, cName) {
    return request({
        url: '/getCourseManagerMessage',
        params: {
            page,
            items,
            type,
            tName,
            cName
        }
    })
}

export function getAbleCourses() {
    return request({
        url: '/getAbleCourses',
    })
}

export function getAbleTeachers(cName, semester) {
    return request({
        url: '/getAbleTeachers',
        params: {
            cName,
            semester
        }
    })
}


export function getAllReadyTcMessage(tcInfo) {
    return request({
        url: '/getAllReadyTcMessage',
        headers: {
            "Content-Type": "application/json"
        },
        data: tcInfo,
    })
}

export function getAbleRoomsMessage(tcInfo) {
    return request({
        url: '/getAbleRoomsMessage',
        headers: {
            "Content-Type": "application/json"
        },
        data: tcInfo
    })
}
export function removeCoursesManagerMessage(list) {
    return request({
        url: '/removeCoursesManagerMessage',
        headers: {
            "Content-Type": "application/json"
        },
        data: list
    })
}
export function addCoursesManagerMessage(courseManager) {
    return request({
        url: '/addCoursesManagerMessage',
        headers: {
            "Content-Type": "application/json"
        },
        data: courseManager
    })
}
export function modifyCoursesManagerMessage(twoCourseManager) {
    return request({
        url: '/modifyCoursesManagerMessage',
        headers: {
            "Content-Type": "application/json"
        },
        data: twoCourseManager
    })
}
export function getSemesterMessage(cName) {
    return request({
        url: '/getSemesterMessage',
        params: {
            cName
        }
    })
}

export function getDayMessage(tcInfo) {
    return request({
        url: '/getDayMessage',
        headers: {
            "Content-Type": "application/json"
        },
        data: tcInfo
    })
}
export function getAbleSemesterMessage(cName) {
    return request({
        url: '/getAbleSemesterMessage',
        params: {
            cName
        }
    })
}

export function getCourseTypeMessage(cName) {
    return request({
        url: '/getCourseTypeMessage',
        params: {
            cName
        }
    })
}

export class GetRoomClass {
    constructor(day, semester, startWeek, endWeek, classOne, classTwo) {
        this.day = day;
        this.semester = semester;
        this.startWeek = startWeek;
        this.endWeek = endWeek;
        this.classOne = classOne;
        this.endWeek = endWeek;
        this.classTwo = classTwo
    }
}


export class GetAllReadyTcClass {
    constructor(tName, semester, startWeek, endWeek, courseName, isNewAdd, id) {
        this.tName = tName;
        this.semester = semester;
        this.startWeek = startWeek;
        this.endWeek = endWeek
        this.courseName = courseName
        this.isNewAdd = isNewAdd
        this.id = id
    }
}

