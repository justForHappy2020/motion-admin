import request from '@/utils/request'
export function getList(page,size) {
    return request({
      url: '/admin/actionList',
      method: 'get',
      params:{
        page:page,
        size:size
        }
    })
  }
export function getAction(str,action_page,size){
  return request({
    url:'/admin/getAction',
    method:'get',
    params:{
      actionStr:str,
      page:action_page,
      size:size
      }
  })
}