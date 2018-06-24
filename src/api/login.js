import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/auth',
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      access_token: 'S4FPUaPmpF0gvb4vJ82yuKjY6SM0Op07'
    }
  })
}

export function getInfo () {
  return request({
    url: '/users/me',
    method: 'get'
  })
}

export function getUsers () {
  return request({
    url: '/users',
    method: 'get'
  })
}
export function addUser (user) {
  return request({
    url: '/users',
    method: 'post',
    data: user
  })
}

export function logout () {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
