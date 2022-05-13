export function deleteDailyTask(token, dailyTaskId) {
    return request({
        url: '/admin/deleteDailyTask',
        method: 'get',
        params: {
            token: token,
            dailyTaskId: dailyTaskId
        }
    })
}