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