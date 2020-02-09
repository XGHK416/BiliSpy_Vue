import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user_id: '',
    base_info: {},
    auths: {}
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_BASE_INFO: (state, base_info) => {
    state.base_info = base_info
  },
  SET_AUTHS: (state, auths) => {
    state.auths = auths
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { identityId, credential } = userInfo
    return new Promise((resolve, reject) => {
      login({ identityId: identityId.trim(), credential: credential, identityType: 'ORIGIN' }).then(response => {
        // 解构赋值，相当于const data = response.data
        const { data } = response
        // 模拟设置token
        commit('SET_TOKEN', data.token)
        commit('SET_USER_ID', data.userId)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, registerInfo) {
    const { nickname, password } = registerInfo
    return new Promise((resolve, reject) => {
      register({ nickname: nickname.trim(), password: password }).then(response => {
        // 解构赋值，相当于const data = response.data
        const { data } = response
        // 模拟设置token
        commit('SET_TOKEN', data.token)
        commit('SET_USER_ID', data.userId)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state.user_id)
      getInfo(state.user_id).then(response => {
        const { data } = response
        const { base_info, auths } = data
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_BASE_INFO', base_info)
        commit('SET_AUTHS', auths)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

