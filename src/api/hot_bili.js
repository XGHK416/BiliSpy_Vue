import request from '@/utils/request'

export function getRank(rid, day) {
  return request({
    url: '/bili-api/hotBili/getRank',
    method: 'get',
    params: {
      'tid': rid,
      'day': day,
    }
  })
}
export function getUploader(mid,user_id) {
  return request({
    url: '/bili-api/hotBili/getUploaderInfo',
    method: 'get',
    params: {
      'mid': mid,
      'userId':user_id

    }
  })
}
export function getVideo(aid,user_id) {
  return request({
    url: '/bili-api/hotBili/getVideoInfo',
    method: 'get',
    params: {
      'aid': aid,
      'userId':user_id
    }
  })
}
// 添加up主侦测
export function addUploaderDetect(data) {
  let param = new URLSearchParams()
  param.append('userId', data.user_id)
  param.append('mid', data.mid)
  return request({
    url: '/bili-api/hotBili/addUploaderDetect',
    method: 'post',
    data: param
  })
}

// 添加up主侦测
export function addVideoDetect(data) {
  let param = new URLSearchParams()
  param.append('userId', data.user_id)
  param.append('aid', data.aid)
  return request({
    url: '/bili-api/hotBili/addVideoDetect',
    method: 'post',
    data: param
  })
}

