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

export function insertOrder(data) {
    return request({
        url: '/admin/insertOrder',
        method: 'post',
        data
    })
}