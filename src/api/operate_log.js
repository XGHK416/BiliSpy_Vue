import request from '@/utils/request'

export function getUserDailyLog(userId) {
  return request({
    url: '/bili-api/operate/user/getDaily',
    method: 'get',
    params:{
        'userId':userId,
    }
  })
}
