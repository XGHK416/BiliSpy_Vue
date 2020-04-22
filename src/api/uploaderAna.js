import request from '@/utils/request'
import qs from 'qs'

// 获取分区
export function getMainSection() {
  return request({
    url: '/bili-api/list/section',
    method: 'get',
  })
}
// 获取up主列表
export function getUploaderList(page,pageSize,selectId,date) {
  return request({
    url: '/bili-api/list/uploader',
    method: 'get',
    params: {
        'page': page,
        'pageSize': pageSize,
        'selectId':selectId,
        'date':date
    }
  })
}
// 获取video列表
export function getVideoList(page,pageSize,selectId,date) {
  return request({
    url: '/bili-api/list/video',
    method: 'get',
    params: {
        'page': page,
        'pageSize': pageSize,
        'selectId':selectId,
        'date':date
    }
  })
}

// up主基本信息
export function getBasicInfo(mid) {
  return request({
    url: '/bili-api/info/uploader/base',
    method: 'get',
    params: {
        'mid': mid,
    }
  })
}
// up主视频分析
export function getVideoAna(mid) {
  return request({
    url: '/bili-api/info/uploader/workInfo',
    method: 'get',
    params: {
        'mid': mid,
    }
  })
}
// 粉丝变化情况
export function fansChange(mid,limit) {
  return request({
    url: '/bili-api/info/uploader/fans',
    method: 'get',
    params: {
        'mid': mid,
        'type': limit
    }
  })
}

// 最近视频发布
export function getRecentVideo(mid,page,pageSize) {
  return request({
    url: '/bili-api/info/uploader/recentWork',
    method: 'get',
    params: {
        'mid': mid,
        'page': page,
        'pageSize': pageSize
    }
  })
}
// 推荐竞品列表
export function getRecommendUploader(mid,page,pageSize) {
  return request({
    url: '/bili-ap/info/uploader/recommendCompeteList',
    method: 'get',
    params: {
        'page': page,
        'pageSize': pageSize,
        'mid':mid,
    }
  })
}
// 获取一个竞品的信息波动
export function getCompetingOnesData(params) {
  return request({
    url: '/bili-api/info/uploader/competeWaveInfo?'+params,
    method: 'get',
    contentType : "application/json" ,
  })
}

// 获取竞品对象列表
export function getCompetingUploader(key,page,pageSize) {
  return request({
    url: '/bili-api/info/uploader/competeList',
    method: 'get',
    params: {
        'key': key,
        'page': page,
        'pageSize': pageSize
    }
  })
}

// 获取一个竞品基本信息
export function getCompetingData(mid) {
  return request({
    url: '/bili-api/info/uploader/competeBaseInfo',
    method: 'get',
    params: {
        'mid':mid
    }
  })
}