import { login, getInfo, getUsers, addUser } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    role: ''
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data.token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE: (state, role) => {
      state.role = role
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response          
          setToken(data.token)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response
          commit('SET_ROLE', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.picture)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getUsuarios ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUsers().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    addUsuario ({commit, state}, user) {
      return new Promise((resolve, reject) => {
        addUser(user).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut ({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
    }
  }
}

export default user
