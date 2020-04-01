import request from '@/utils/request'
export function scanUnusable(page,pageSize) {
    return request({
        url: '/bili-api/detectManager/scanUnusable',
        method: 'get',
        params:{
            'page':page,
            'pageSize':pageSize
        }
    })
}
export function selectUploader(key,page,pageSize) {
    return request({
        url: '/bili-api/detectManager/selectUploader',
        method: 'get',
        params:{
            'key':key,
            'page':page,
            'pageSize':pageSize
        }
    })
}
export function getDetectInfo(type) {
    return request({
        url: '/bili-api/detectManager/getDetectInfo',
        method: 'get',
        params:{
            'key':type,
        }
    })
}

export function deleteDetectObject(moId,unusableId) {
    let param = new URLSearchParams()
    param.append('moId', moId)
    param.append('unusableId', unusableId)
    return request({
        url: '/bili-api/detectManager/deleteDetectObject',
        method: 'post',
        data:param
    })
}