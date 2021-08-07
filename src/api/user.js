import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/login',
//     method: 'get',
//     params{token}
//   })
// }

// export function logout() {
//   return request({
//     url: '/admin/user/logout',
//     method: 'post'
//   })
// }

export function getCode(data){
  return request({
    url:'/user/getVerificationCode',
    method:'post',
    data
  })
}
