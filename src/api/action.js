import request from '@/utils/request'
export function getList(page,size,type,starTime,endTime,searchStr) {
    return request({
      url: '/admin/actionList',
      method: 'get',
      params:{
        page:page,
        size:size,
        type:type,
        starTime:starTime,
        endTime:endTime,
        searchStr:searchStr
        }
    })
}
export function getAction(str, action_page, size) {
    return request({
        url: '/admin/getAction',
        method: 'get',
        params: {
            actionStr: str,
            page: action_page,
            size: size
        }
    })
}
export function insertAction(data) {
    return request({
        url: '/admin/insertAction',
        method: 'post',
        data
    })
}
export function deleteAction(token, actionId) {
    return request({
        url: '/admin/deleteAction',
        method: 'get',
        params: {
            token: token,
            actionId: actionId
        }
    })
}
export function updataAction(data) {
    return request({
        url: '/admin/updataAction',
        method: 'post',
        data
    })
}