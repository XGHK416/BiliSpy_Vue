import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/bili-api/login',
    method: 'get',
    params: {
      identityId: data.identityId,
      credential: data.credential,
      identityType: data.identityType
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
    url: '/bili-api/register',
    method: 'get',
    params: {
      nickname: data.nickname,
      password: data.password
    }
  })
}
