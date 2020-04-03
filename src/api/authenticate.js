import request from '@/utils/request'
export function authenticatePassword(userId,password) {
    let param = new URLSearchParams()
    param.append('moId', userId)
    param.append('currentPassword', password)
    return request({
        url: '/bili-api/userManage/confirmPassword',
        method: 'post',
        data:param
    })
}