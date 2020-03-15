import request from '@/utils/request'

export function getVideoInfo(aid) {
  return request({
    url: '/bili-api/video/getInfo',
    method: 'get',
    params: {
        'aid': aid,
    }
  })
}

export function getEvaluateInfo(aid) {
    return request({
      url: '/bili-api/video/getEvaluateInfo',
      method: 'get',
      params: {
          'aid': aid,
      }
    })
  }
  export function getRecommend(aid) {
    return request({
      url: '/bili-api/video/getRecommend',
      method: 'get',
      params: {
          'aid': aid,
      }
    })
  }
  
