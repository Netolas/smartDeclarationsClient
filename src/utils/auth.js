import Cookies from 'js-cookie'

const TokenKey = 'AH2018'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

const UserKey = 'AH2018User'

export function getUserId () {
  return Cookies.get(UserKey)
}

export function setUserId (uid) {
  return Cookies.set(UserKey, uid)
}

export function removeUserId () {
  return Cookies.remove(UserKey)
}
