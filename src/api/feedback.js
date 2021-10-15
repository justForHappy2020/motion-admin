import request from '@/utils/request'
export function getUserFeedback(page, size) {
    return request({
        url: '/admin/getUserFeedback',
        method: 'get',
        params: {
            page: page,
            size: size
        }
    })
}
export function getFeedback(token, page, size) {
    return request({
        url: '/user/getFeedback',
        method: 'get',
        params: {
            token: token,
            page: page,
            size: size,
        }
    })
}
export function sendFeedback(data) {
    return request({
        url: '/user/sendFeedback',
        method: 'post',
        data
    })
}
export function saveUserFeedback(feedbackId, answer) {
    return request({
        url: '/admin/saveUserFeedback',
        method: 'get',
        params: { 
            feedbackId:  feedbackId,
            answer: answer
        }
    })
}