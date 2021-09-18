import request from '@/utils/request'
export function sendFeedback(data) {
    return request({
        url: '/user/sendFeedback',
        method: 'post',
        data
    })
}