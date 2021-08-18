import request from '@/utils/request'

export function getList(page, size) {
    return request({
        url: '/admin/userManagerList',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}

export function saveUserdata(data) {
    return request({
        url: '/community/saveUserdata',
        method: 'post',
        data
    })
}