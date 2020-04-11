import request from '@/utils/request'

export function getVideoDetectInfo(page,page_size,user_id,type,parent_id) {

  return request({
    url: '/bili-api/detectJob/getVideoJogList',
    method: 'get',
    params:{
        page:page,
        pageSize:page_size,
        userId:user_id,
        type:type,
        parentId:parent_id
    }
  })
}

export function getUploaderJobList(page,page_size,user_id,type,detect_name) {

  return request({
    url: '/bili-api/detectJob/getUploaderJobList',
    method: 'get',
    params:{
        page:page,
        pageSize:page_size,
        userId:user_id,
        type:type,
        detectName:detect_name
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