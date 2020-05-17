import request from '@/utils/request'

export function getUploader(params) {
  return request({
    url: '/bili-api/detectJob/getUploader',
    method: 'get',
    params:{
      params:params,
    }
  })
}

export function getVideoDetectInfo(bvid) {
  let param = new URLSearchParams()
  param.append('params', bvid)
  return request({
    url: '/bili-api/detectJob/getVideoDetectInfo',
    method: 'post',
    data:param
  })
}

export function getUploaderList(bvid) {
  let param = new URLSearchParams()
  param.append('params', bvid)
  return request({
    url: '/bili-api/detectJob/getUploaderList',
    method: 'post',
    data:param
  })
}

export function addJob(job) {

  console.log(job)
  let param = new URLSearchParams()
  param.append('userId', job.userId)
  param.append('jobType', job.jobType)
  param.append('cornExpression', job.cornExpression)
  param.append('detectObject', job.detectObject)
  param.append('detectObjectId', job.detectObjectId)
  param.append('detectObjectProfile',job.detectObjectProfile)
  param.append('detectTime', job.detectTime)
  param.append('duringDate', job.duringDate)
  // 视频专属
  if(job.jobType=='videoJob'){
    param.append('auths',job.auths)
    param.append('authsId',job.auths_id)
    param.append('authsProfile',job.auths_profile)
  }
 
  return request({
    url: '/bili-api/detectJob/addjob',
    method: 'post',
    data:param
  })
}