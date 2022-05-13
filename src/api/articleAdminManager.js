import request from '@/utils/request'

export function deleteArticle(token, articleId) {
    return request({
        url: '/admin/deleteArticle',
        method: 'get',
        params: {
            token: token,
            articleId: articleId
        }
    })
}
export function updataArticle(token, articleId) {
    return request({
        url: '/admin/updataArticle',
        method: 'get',
        params: {
            token: token,
            articleId: articleId
        }
    })
}