import request from '@/utils/request'

export function getList(page,size) {
  return request({
    url: '/admin/userManagerList',
    method: 'get',
    params:{
      page:page,
      size:size
      }
  })
}