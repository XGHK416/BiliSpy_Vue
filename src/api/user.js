import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/bili-api/test1',
    method: 'get',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/bili-api/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/bili-api/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/bili-api/test2',
    method: 'get',
    params: {
      nickname: data.nickname,
      password: data.password
    }
  })
}
