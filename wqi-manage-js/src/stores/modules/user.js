import { login, getInfor } from '@/apis/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/routers'

const state = {
  token: getToken(),
  name: null,
  roles: null,
  device_id: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_NAME: (state, name) => {
    state.name = name
  },

  SET_ROLES: (state, roles) => {
    state.roles = roles
  },

  SET_DEVICE_ID: (state, device_id) => {
    state.device_id = device_id
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password })
        .then((res) => {
          const data = res.data.item

          commit('SET_TOKEN', data.token)
          commit('SET_ROLES', data.infors.role)

          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfor({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfor(state.token)
        .then((res) => {
          const data = res.data.item

          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { role, name } = data
          commit('SET_ROLES', role)
          commit('SET_NAME', name)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({ commit, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', null)
    commit('SET_NAME', null)
    removeToken()
    resetRouter()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
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
