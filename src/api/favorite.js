import request from '@/utils/request'

export function doFavorite(userId, favoriteId, type) {
  return request({
    url: '/bili-api/favorite/addFavorite',
    method: 'post',
    data: {
      'userId': userId,
      'favoriteId': favoriteId,
      'type': type,
    }
  })
}

export function unFavorite(id) {
  return request({
    url: '/bili-api/favorite/cancelFavorite',
    method: 'get',
    params: {
      'id': id,
    }
  })
}

export function findFavorite(userId, favoriteId, type) {
  return request({
    url: '/bili-api/favorite/checkFavorite',
    method: 'post',
    data: {
      'userId': userId,
      'favoriteId': favoriteId,
      'type': type,
    }
  })
}

export function findFavoriteGroup(userId, type) {
  return request({
    url: '/bili-api/favorite/getGroup',
    method: 'get',
    params: {
      'userId': userId,
      'type': type,
    }
  })
}

export function findFavoriteList(userId, type,groupId) {
  return request({
    url: '/bili-api/favorite/findFavorite',
    method: 'get',
    params: {
      'userId': userId,
      'type': type,
      'groupId': groupId
    }
  })
}

export function addGroup(userId, type,groupName) {
  return request({
    url: '/bili-api/favorite/addGroup',
    method: 'post',
    data: {
      'createId': userId,
      'groupType': type,
      'groupName': groupName
    }
  })
}

export function updateFavorite(id, groupId,remark) {
  return request({
    url: '/bili-api/favorite/updateFavorite',
    method: 'put',
    data: {
      'id': id,
      'groupId': groupId,
      'remark': remark
    }
  })
}




