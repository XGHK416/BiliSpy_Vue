import request from '@/utils/request'

export function addNewMo(operaMoId, type) {
  let param = new URLSearchParams()
  param.append('operaMoId', operaMoId)
  param.append('type',type)
  return request({
    url: '/bili-api/userManage/addNewMo',
    method: 'post',
    data:param
  })
}
export function getCount() {
  return request({
    url: '/bili-api/userManage/getCount',
    method: 'get',
  })
}
export function getUserList(page, pageSize, type) {
  return request({
    url: '/bili-api/userManage/getUserList',
    method: 'get',
    params: {
      'page': page,
      'pageSize': pageSize,
      'type': type
    }
  })
}
export function getUserInfo(user_id) {
  return request({
    url: '/bili-api/userManage/getUserInfo',
    method: 'get',
    params: {
      'userId': user_id,
    }
  })
}
export function getMoOperate(selectedId, searchFrom, date) {
  return request({
    url: '/bili-api/userManage/getMoOperate',
    method: 'get',
    params: {
      'selectedId': selectedId,
      'searchFrom': searchFrom,
      'date': date
    }
  })
}
export function getViewerOperate(viewerId, searchFrom, date) {
  return request({
    url: '/bili-api/userManage/getViewerOperate',
    method: 'get',
    params: {
      'viewerId': viewerId,
      'searchFrom': searchFrom,
      'date': date
    }
  })
}

export function writtenOffUser(createId, writtenOffId, isWrittenOf) {
  let param = new URLSearchParams()
  param.append('createId', createId)
  param.append('writtenOffId',writtenOffId)
  param.append('isWrittenOf',isWrittenOf)
  return request({
    url: '/bili-api/userManage/writtenOffUser',
    method: 'post',
    data:param
  })
}
export function coldUser(data) {
  let param = new URLSearchParams()
  param.append('coldUserId', data.cold_user_id)
  param.append('createMoId', data.create_mo_id)
  param.append('coldReason', data.cold_reason)
  return request({
    url: '/bili-api/userManage/coldUser',
    method: 'post',
    data:param
  })
}
export function decoldUser(cold_id, mo_id) {
    return request({
      url: '/bili-api/userManage/decoldUser',
      method: 'delete',
      params: {
        'coldId': cold_id,
        'moId': mo_id,
      }
    })
  }
  export function searchUser(key, type) {
    let param = new URLSearchParams()
    param.append('key', key)
    param.append('type',type)
    return request({
      url: '/bili-api/userManage/searchUser',
      method: 'post',
      data:param
    })
  }