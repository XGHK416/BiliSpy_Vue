import request from '@/utils/request'
export function changeAnnounce(announce_text,mo_id) {
    let param = new URLSearchParams()
    param.append('announceText', announce_text)
    param.append('createMoId', mo_id)
    return request({
      url: '/bili-api/announce/changeAnnounce',
      method: 'post',
      data:param
    })
  }
  export function getAnnounce() {
    return request({
      url: '/bili-api/announce/getAnnounce',
      method: 'get',
    
    })
  }