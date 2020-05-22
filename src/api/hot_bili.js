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
export function getUploader(mid) {
  return request({
    url: '/bili-api/hotBili/getUploaderInfo',
    method: 'get',
    params: {
      'mid': mid,
    }
  })
}
export function getVideo(aid) {
  return request({
    url: '/bili-api/hotBili/getVideoInfo',
    method: 'get',
    params: {
      'aid': aid,
    }
  })
}
// 添加up主侦测
export function addUploaderDetect(data) {
  let param = new URLSearchParams()
  param.append('userId', data.user_id)
  param.append('mid', data.mid)
  return request({
    url: '/bili-api/hotBili/addDetect',
    method: 'post',
    data: param
  })
}