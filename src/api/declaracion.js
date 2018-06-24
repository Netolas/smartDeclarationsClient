import request from '@/utils/request'

export function getAcademics () {
  return request({
    url: '/academicos',
    method: 'get'
  })
}

export function runAcademic () {
  return request({
    url: '/academicos/inicio',
    method: 'post'
  })
}


export function getPatrimonials () {
  return request({
    url: '/patrimonials',
    method: 'get'
  })
}

export function runPatrimonial () {
  return request({
    url: '/patrimonials/inicio',
    method: 'post'
  })
}
