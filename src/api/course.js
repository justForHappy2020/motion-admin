import request from '@/utils/request'

export function getList(page,size,ifonline,starTime,endTime,searchStr) {
  return request({
    url: '/admin/courseList',
    method: 'get',
    params:{
      page:page,
      size:size,
      ifonline:ifonline,
      starTime:starTime,
      endTime:endTime,
      searchStr:searchStr
      }
  })
}

export function searchCourse(){
  return request({
    url:'/admin/searchCourse',
    method:'get'
  })
}

export function editCourse(){
  return request({
    url:'/admin/editCourse',
    method:'post'
  })
}

export function deleteCourse(data){
  return request({
    url:'/admin/deleteCourse',
    method:'post',
    data
  })
}

export function addCourse(data){
  return request({
    url:'/admin/insertCourse',
    method:'post',
    data
  })
}
