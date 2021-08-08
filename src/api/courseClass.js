import request from '@/utils/request'

export function getList() {
  return request({
    url: '/admin/courseClassList',
    method: 'get'
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
export function modifyHptIos(data){
  return request({
    url:'/user/modifyHptIos',
    method:'post',
    data
  })
}