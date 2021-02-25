import {logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import api from '@/api/common'
import {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  menus: [], // 后台权限菜单
  froms: {}, // 权限菜单添加模块的表单
  currentMenu: '' // 当前菜单父节点
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_FROMS: (state, froms) => {
    state.froms = froms
  },
  SET_CURRENTMENUE: (state, menu) => {
    state.currentMenu = menu
  }
}

const actions = {
  // user login
  login ({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      api.login(userInfo).then(response => {
        const {data} = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({commit}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {menu, from, name, avatar, introduction} = data

        // roles must be a non-empty array
        if (!menu || menu.length <= 0) {
          reject('getInfo: menu must be a non-null array!')
        }

        commit('SET_MENUS', menu)
        commit('SET_FROMS', from)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_MENUS', [])
        commit('SET_FROMS', [])
        removeToken()
        resetRouter()

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({commit}, state, name) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_MENUS', [])
      commit('SET_FROMS', [])
      removeToken()
      resolve()
    })
  },

  currentMenu ({commit}, name) {
    commit('SET_CURRENTMENUE', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
