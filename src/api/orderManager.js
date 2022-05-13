import request from '@/utils/request'
export function getOrder(page, size) {
    return request({
        url: '/admin/getOrder',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}
export function delectOrder(token, orderCopy1Id) {
    return request({
        url: '/admin/delectOrder',
        method: 'get',
        params: {
            token: token,
            orderCopy1Id: orderCopy1Id
        }
    })
}


export function insertOrder(data) {
    return request({
        url: '/admin/insertOrder',
        method: 'post',
        data
    })
}
export function updateOrder(data) {
    return request({
        url: '/admin/updateOrder',
        method: 'post',
        data
    })
}