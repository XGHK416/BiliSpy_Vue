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

export function bandIdentity(data) {
  return request({
    url: '/bili-api/space/bandIdentity',
    method: 'post',
    params: {
      identityType: data.identityType,
      identityId: data.identityId,
      userId: data.userId
    }
  })
}

export function updateInfo(data) {
  return request({
    url: '/bili-api/space/updateInfo',
    method: 'put',
    params: {
      nickName: data.nickName,
      userId: data.userId
    }
  })
}

export function updateProfile(data) {
  return request({
    url: '/bili-api/space/updateProfile',
    method: 'put',
    params: {
      profile: data.profile,
      userId: data.userId
    }
  })
}
