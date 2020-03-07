import request from '@/utils/request'
import qs from 'qs'
export function getUploaderList(page,pageSize) {
  return request({
    url: '/bili-api/uploader/getList',
    method: 'get',
    params: {
        'page': page,
        'pageSize': pageSize
    }
  })
}

export function getBasicInfo(mid) {
  return request({
    url: '/bili-api/uploader/content/getBasicInfo',
    method: 'get',
    params: {
        'mid': mid,
    }
  })
}
// up主视频分析
export function getVideoAna(mid) {
  return request({
    url: '/bili-api/uploader/content/getVideoAna',
    method: 'get',
    params: {
        'mid': mid,
    }
  })
}

export function fansChange(mid,limit) {
  return request({
    url: '/bili-api/uploader/content/fansChange',
    method: 'get',
    params: {
        'mid': mid,
        'type': limit
    }
  })
}

export function getRecentVideo(mid,page,pageSize) {
  return request({
    url: '/bili-api/uploader/content/getRecentVideo',
    method: 'get',
    params: {
        'mid': mid,
        'page': page,
        'pageSize': pageSize
    }
  })
}
// type 是否主体
export function getUploader(mid,limit,type) {
  return request({
    url: '/bili-api/uploader/competing/getUploader',
    method: 'get',
    params: {
        'mid': mid,
        'limit':limit,
        'type': type
    }
  })
}

export function getCompetingOnesData(params) {
  return request({
    url: '/bili-api/uploader/competing/getCompetingOnesData?'+params,
    method: 'get',
    contentType : "application/json" ,
  })
}

export function getCompetingUploader(key,page,pageSize) {
  return request({
    url: '/bili-api/uploader/competing/getCompetingUploader',
    method: 'get',
    params: {
        'key': key,
        'page': page,
        'pageSize': pageSize
    }
  })
}

export function getCompetingData(mid) {
  return request({
    url: '/bili-api/uploader/competing/getCompetingData',
    method: 'get',
    params: {
        'mid':mid
    }
  })
}