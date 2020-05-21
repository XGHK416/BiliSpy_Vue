import request from '@/utils/request'
import qs from 'qs'

// 获取分区
export function getTopThree(mid) {
  return request({
    url: '/bili-api/work/getTopThree',
    method: 'get',
    params:{
        mid:mid
    }
  })
}
// 获取视频平均水平
export function getAverage(mid) {
  return request({
    url: '/bili-api/work/getAverage',
    method: 'get',
    params:{
        mid:mid
    }
  })
}
// 获取常见tag
export function getCommonlyTags(mid) {
  return request({
    url: '/bili-api/work/getCommonlyTags',
    method: 'get',
    params:{
        mid:mid
    }
  })
}
// 获取每月视频数目
export function getMonthWorksNum(mid) {
  return request({
    url: '/bili-api/work/getMonthWorksNum',
    method: 'get',
    params:{
        mid:mid
    }
  })
}
// 获取近期视频的信息
export function getRecentWorksStatus(mid) {
  return request({
    url: '/bili-api/work/getRecentWorksStatus',
    method: 'get',
    params:{
        mid:mid
    }
  })
}
// 预测这个月发布视频数
export function predectNextCount(mid) {
  return request({
    url: '/bili-api/work/predectNextCount',
    method: 'get',
    params:{
        mid:mid,
    }
  })
}
// 预测下个视频的
export function predectNextStatus(mid,tid) {
  return request({
    url: '/bili-api/work/predectNextStatus',
    method: 'get',
    params:{
        mid:mid,
        tid:tid
    }
  })
}