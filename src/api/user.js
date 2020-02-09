import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/bili-api/login',
    method: 'post',
    params: {
      identityId: data.identityId,
      credential: data.credential,
      identityType: data.identityType
    }
  })
}

export function getInfo(user_id) {
  return request({
    url: '/bili-api/space/getBaseInfo',
    method: 'get',
    params: { user_id }
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
    method: 'post',
    params: {
      nickname: data.nickname,
      password: data.password
    }
  })
}
