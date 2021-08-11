import request from '@/utils/request'

export function getList(page, size) {
    return request({
        url: '/admin/courseList',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}

export function searchCourse() {
    return request({
        url: '/admin/searchCourse',
        method: 'get'
    })
}

export function editCourse() {
    return request({
        url: '/admin/editCourse',
        method: 'post'
    })
}

export function deleteCourse(token, courseId) {
    return request({
        url: '/admin/deleteCourse',
        method: 'post',
        params: {
            token: token,
            courseId: courseId
        }
    })
}

export function addCourse(data) {
    return request({
        url: '/admin/insertCourse',
        method: 'post',
        data
    })
}