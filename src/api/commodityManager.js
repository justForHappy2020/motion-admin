import request from '@/utils/request'
export function getGoods(page, size) {
    return request({
        url: '/admin/getGoods',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}