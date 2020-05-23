import request from '@/utils/request'

export function searchUploader(params) {
  return request({
    url: '/bili-api/search/uploader',
    method: 'get',
    params: params
  })
}
// 添加up主侦测
export function searchVideo(params) {
  return request({
    url: '/bili-api/search/video',
    method: 'get',
    params: params
  })
}