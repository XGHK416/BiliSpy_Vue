import request from '@/utils/request'

export function getVideoDetectInfo(page,page_size,user_id,type) {

  return request({
    url: '/bili-api/detectJob/getVideoJogList',
    method: 'get',
    params:{
        page:page,
        pageSize:page_size,
        userId:user_id,
        type:type
    }
  })
}
export function getResultList(detectId) {

  return request({
    url: '/bili-api/detectJob/getResultList',
    method: 'get',
    params:{
      detectId:detectId,
    }
  })
}

export function getVideoJogInfo(detectId) {

  return request({
    url: '/bili-api/detectJob/getVideoJogInfo',
    method: 'get',
    params:{
      detectId:detectId,
    }
  })
}