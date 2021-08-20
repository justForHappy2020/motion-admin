import request from '@/utils/request'

export function getList(page,size,ifonline,starTime,endTime,searchStr) {
  return request({
    url: '/admin/courseList',
    method: 'get',
    params:{
      page:page,
      size:size,
      ifOnline:ifonline,
      starTime:starTime,
      endTime:endTime,
      searchStr:searchStr
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
        method: 'get',
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

export function updataCourse(data) {
    return request({
        url: '/admin/updataCourse',
        method: 'post',
        data
    })
}