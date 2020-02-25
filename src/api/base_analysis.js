import request from '@/utils/request'

export function getBaseTopInfo() {
  return request({
    url: '/bili-api/baseAnalysis/topInfo',
    method: 'get',
  })
}

// top20粉丝数量排行
export function getTopFansLevelUploader() {
    return request({
      url: '/bili-api/baseAnalysis/topFansLevelUploader',
      method: 'get',
    })
}

// 返回up主各类信息分析
export function getCountUploaderInfo() {
    return request({
      url: '/bili-api/baseAnalysis/countUploaderInfo',
      method: 'get',
    })
}

// 返回up主各类信息分析
export function getVideoSectionCount() {
    return request({
      url: '/bili-api/baseAnalysis/getVideoSectionCount',
      method: 'get',
    })
}

// 近七日爬取视频和总爬取
export function getSpiderVideoCount() {
    return request({
      url: '/bili-api/baseAnalysis/getSpiderVideoCount',
      method: 'get',
    })
}
  
// 视频类别统计
export function getWorldCloud() {
    return request({
      url: '/bili-api/baseAnalysis/getWorldCloud',
      method: 'get',
    })
}