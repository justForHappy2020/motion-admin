import request from '@/utils/request'
export function sendFeedback(data) {
    return request({
        url: '/user/sendFeedback',
        method: 'post',
        data
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
export function getFeedbackById(feedbackId) {
    return request({
        url: '/user/getFeedbackById',
        method: 'get',
        params: {
            feedbackId: feedbackId,
        }
    })
}