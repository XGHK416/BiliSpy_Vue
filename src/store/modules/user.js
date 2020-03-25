import { login, logout, getInfo, register, bandIdentity, updateInfo, updateProfile,changePassword } from '@/api/user'
import { getToken, setToken, removeToken,getId,setId,removeId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user_id: '',
    base_info: {},
    auths: {},
    roles:['admin']
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
  },
  SET_ONES_BASE_INFO: (state, newInfo) => {
    const {base_info_item_type, base_info_item_value} = newInfo
    // console.log(base_info_item_type, base_info_item_value)
    // console.log(state.base_info)
    state.base_info[base_info_item_type] = base_info_item_value
  },
  SET_ONES_AUTHS: (state, newAuths) => {
    const {auths_item_type, auths_item_value} = newAuths
    state.auths[auths_item_type] = auths_item_value
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { identityId, credential,identityType } = userInfo
    return new Promise((resolve, reject) => {
      login({ identityId: identityId.trim(), credential: credential, identityType: identityType }).then(response => {
        // 解构赋值，相当于const data = response.data
        const { data } = response
        // 模拟设置token
        commit('SET_TOKEN', data.token)
        commit('SET_USER_ID', data.userId)
        setToken(data.token)
        setId(data.userId)
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
        setId(data.userId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user bandIdentity
  bandIdentity({ commit }, bandInfo) {
    const { identityType, identityId, userId } = bandInfo
    return new Promise((resolve, reject) => {
      bandIdentity({ identityType: identityType, identityId: identityId, userId: userId }).then(response => {
        if (identityType === 'PHONE') {
          commit('SET_ONES_AUTHS',{'auths_item_type': 'phone','auths_item_value': identityId} )

        } else if (identityType === 'EMAIL') {
          commit('SET_ONES_AUTHS', {'auths_item_type': 'email','auths_item_value': identityId})
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user updateInfo
  updateInfo({ commit }, updateInfoMsg) {
    const { nickName, userId } = updateInfoMsg
    return new Promise((resolve, reject) => {
      updateInfo({ nickName: nickName, userId: userId }).then(response => {
        commit('SET_ONES_BASE_INFO', {
          'base_info_item_type': 'nickName',
          'base_info_item_value': nickName
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  changePassword({commit},chagnPassword) {
    const { newPassword, userId } = chagnPassword
    return new Promise((resolve, reject) => {
      changePassword({ password: newPassword, userId: userId }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user updateProfile
  updateProfile({ commit }, profileUrl) {
    commit('SET_ONES_BASE_INFO', {
      'base_info_item_type': 'profile',
      'base_info_item_value': profileUrl
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let user_id = getId()
      getInfo(user_id).then(response => {
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
        removeId()
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
      removeId()
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

