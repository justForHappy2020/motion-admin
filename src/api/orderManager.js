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