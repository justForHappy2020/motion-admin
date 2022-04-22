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