import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/bili-api/login',
    method: 'post',
    data: {
      'identityId': data.identityId,
      'credential': data.credential,
      'identityType': data.identityType
    }
  })
}

export function getInfo(user_id) {
  return request({
    url: '/bili-api/space/getBaseInfo',
    method: 'get',
    params: { 'userId': user_id }
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
    data: {
      'nickname': data.nickname,
      'password': data.password
    }
  })
}

export function bandIdentity(data) {
  return request({
    url: '/bili-api/space/bandIdentity',
    method: 'post',
    data: data
  })
}

export function updateInfo(data) {
  return request({
    url: '/bili-api/space/updateInfo',
    method: 'put',
    data: {
      'nickName': data.nickName,
      'userId': data.userId
    }
  })
}

export function updateProfile(data) {
  return request({
    url: '/bili-api/space/updateProfile',
    method: 'put',
    data: {
      'profile': data.profile,
      'userId': data.userId
    }
  })
}
export function changePassword(data) {
  return request({
    url: '/bili-api/changePassword',
    method: 'post',
    data: {
      'credential': data.password,
      'userId': data.userId
    }
  })
}
