import request from '@/utils/request'

export function getList(number,starTime,endTime,searchStr) {
  return request({
    url: '/admin/courseClassList',
    method: 'get',
    params:{
      number:number,
      starTime:starTime,
      endTime:endTime,
      searchStr:searchStr
      }
  })
}

// 增加分类项
export function addCourseList(data) {
    return request({
        url: '/admin/insertCourseClass',
        method: 'post',
        data
    })
}

//增加分类组
export function addCourseGroupList(data) {
    return request({
        url: '/admin/insertCourseClassList',
        method: 'post',
        data
    })
}

//把上传的图片转换为url
export function modifyHptIos(data) {
    return request({
        url: '/user/modifyHptIos',
        method: 'post',
        data
    })
}
export function deleteCourseClass(token, courseClassId) {
    return request({
        url: '/admin/deleteCourseClass',
        method: 'get',
        params: {
            token: token,
            courseClassId: courseClassId
        }
    })
}
export function updataCourseClass(data) {
    return request({
        url: '/admin/updataCourseClass',
        method: 'post',
        data
    })
}