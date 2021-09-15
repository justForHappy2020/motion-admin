import request from '@/utils/request'
export function login(token) {
    return request({
        url: '/admin/login',
        method: 'get',
        params: {
            token: token,
        }
    })
}