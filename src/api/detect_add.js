import request from '@/utils/request'

export function getVideoDetectInfo(bvid) {
  let param = new URLSearchParams()
  param.append('params', bvid)
  return request({
    url: '/bili-api/detectJob/getVideoDetectInfo',
    method: 'post',
    data:param
  })
}

export function addJob(job) {
  let param = new URLSearchParams()
  param.append('userId', job.userId)
  param.append('jobType', job.jobType)
  param.append('cornExpression', job.cornExpression)
  param.append('detectObject', job.detectObject)
  param.append('detectObjectId', job.detectObjectId)
  param.append('detectObjectProfile',job.detectObjectProfile)
  param.append('detectTime', job.detectTime)
  param.append('duringDate', job.duringDate)
  param.append('auths',job.auths)
  param.append('authsId',job.auths_id)
  param.append('authsProfile',job.auths_profile)
  return request({
    url: '/bili-api/detectJob/addjob',
    method: 'post',
    data:param
  })
}