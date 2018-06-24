import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { WSAEDQUOT } from 'constants';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response
    if (res.status !== 200 && res.status !== 201) {
      return Promise.reject(new Error('Error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
