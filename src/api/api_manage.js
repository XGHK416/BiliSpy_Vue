import request from '@/utils/request'

export function getApiTest(apiId, apiBaseUrl,params,moId) {
  let param = new URLSearchParams()
  param.append('apiId', apiId)
  param.append('apiBaseUrl', apiBaseUrl)
  param.append('params', params)
  param.append('moId', moId)
  return request({
    url: '/bili-api/apiMo/getApiTest',
    method: 'post',
    data:param
  })
}
export function reportApi(apiId, reportReason,createUser,isFix) {
    let param = new URLSearchParams()
    param.append('apiId', apiId)
    param.append('reportReason', reportReason)
    param.append('createUser', createUser)
    param.append('isFix', isFix)
    return request({
      url: '/bili-api/apiMo/reportApi',
      method: 'post',
      data:param
    })
  }
export function getApiList() {
  return request({
    url: '/bili-api/apiMo/getApiList',
    method: 'get',
  })
}
export function getApiParam(apiId) {
    return request({
      url: '/bili-api/apiMo/getApiParam',
      method: 'get',
      params:{
          'apiId':apiId
      }
    })
  }
  export function getApiReportInfo(apiId) {
    return request({
      url: '/bili-api/apiMo/getApiReportInfo',
      method: 'get',
      params:{
          'apiId':apiId
      }
    })
  }
  export function getApiRecover(apiId,moId) {
    let param = new URLSearchParams()
    param.append('apiId', apiId)
    param.append('moId', moId)
    return request({
      url: '/bili-api/apiMo/getApiRecover',
      method: 'post',
      data:param
    })
  }