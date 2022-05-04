import request from '@/utils/request'
export function getNavigation(page, size) {
    return request({
        url: '/admin/getNavigation',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}
export function updateNavigation(data) {
    return request({
        url: '/admin/updateNavigation',
        method: 'post',
        data
    })
}
export function insertNavigation(data) {
    return request({
        url: '/admin/insertNavigation',
        method: 'post',
        data
    })
}
export function delectNavigation(token, navigationId) {
    return request({
        url: '/admin/delectNavigation',
        method: 'get',
        params: {
            token: token,
            navigationId: navigationId
        }
    })
}