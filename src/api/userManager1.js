import request from '@/utils/request'

export function getList(page,size,if_ban,starTime,endTime,searchStr) {
  return request({
    url: '/admin/userManagerList',
    method: 'get',
    params:{
      page:page,
      size:size,
      ifban:if_ban,
      starTime:starTime,
      endTime:endTime,
      searchStr:searchStr
      }
  })
}