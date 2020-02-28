import request from '@/utils/request'

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
