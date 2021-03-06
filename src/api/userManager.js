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
        url: '/admin/saveUserdata',
        method: 'post',
        data
    })
}
export function banUser(token, userId) {
    return request({
        url: '/admin/banUser',
        method: 'get',
        params: {
            token: token,
            userId: userId,
        }
    })
}