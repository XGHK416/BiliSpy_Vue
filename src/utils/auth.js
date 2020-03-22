import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserId = 'userId'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getId() {
  return Cookies.get(UserId)
}

export function setId(id) {
  return Cookies.set(UserId, id)
}

export function removeId() {
  return Cookies.remove(UserId)
}


