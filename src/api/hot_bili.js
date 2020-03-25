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