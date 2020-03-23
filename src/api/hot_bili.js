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