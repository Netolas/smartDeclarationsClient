import router from './router'
import store from './store'
import { getToken, getUserId } from '@/utils/auth'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  store.dispatch('setLoadingState', true)
  if (getToken()) {

    if (to.path === '/login') {
      if (store.getters.role === 'admin') {
        next({ path: '/usuarios' })
      } else {
        next({ path: '/' })
      }
    } else {
      if (store.getters.role === '') {
        store.dispatch('GetInfo').then(res => {
          if (to.path === '/') {
            if (store.getters.role === 'admin') {
              next({ path: '/usuarios' })
            } else {
              next({ path: '/general' })
            }
          } else {
            next()
          }
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }

  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  store.dispatch('setLoadingState', false)
})
