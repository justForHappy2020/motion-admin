import request from '@/utils/request'
export function getApply(page, size) {
    return request({
        url: '/admin/getApply',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}

export function delectApply(token, navigationId) {
    return request({
        url: '/admin/delectApply',
        method: 'get',
        params: {
            token: token,
            navigationId: navigationId
        }
    })
}