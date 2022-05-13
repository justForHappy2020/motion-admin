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
export function delectGoods(token, goodsId) {
    return request({
        url: '/admin/deleteGoods',
        method: 'get',
        params: {
            token: token,
            goodsId: goodsId
        }
    })
}
export function updataGoods(data) {
    return request({
        url: '/admin/updataGoods',
        method: 'post',
        data
    })
}
export function insertGoods(data) {
    return request({
        url: '/admin/insertGoods',
        method: 'post',
        data
    })
}