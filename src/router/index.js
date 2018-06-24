import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Layout from '@/views/layout/Layout'
import Login from '@/components/Login'
import UserAdmin from '@/components/users/UserAdmin'
import Academico from '@/components/academico/Academico'
import Laboral from '@/components/laboral/Laboral'
import Patrimonial from '@/components/patrimonial/Patrimonial'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/general',
    name: '',
    component: Layout,
    children: [{
      path: '',
      name: 'Inicio',
      component: Inicio,
      role: 'user',
      meta: {
        icon: 'home',
        title: 'Inicio'
      }
    }
    ]
  },
  {
    path: '/usuarios',
    name: '',
    component: Layout,
    children: [
    {
      path: '',
      name: 'Usuarios',
      role: 'admin',
      component: UserAdmin,
      meta: {
        icon: 'users',
        title: 'Usuarios'
      }
    }
    ]
  },
  {
    path: '/academico',
    name: '',
    component: Layout,
    children: [
    {
      path: '',
      name: 'Academico',
      role: 'user',
      component: Academico,
      meta: {
        icon: 'address-card',
        title: 'Historial Academico'
      }
    }
    ]
  },
  {
    path: '/laboral',
    name: '',
    component: Layout,
    children: [
    {
      path: '',
      name: 'Laboral',
      role: 'user',
      component: Laboral,
      meta: {
        icon: 'wrench',
        title: 'Historial Laboral'
      }
    }
    ]
  },
  {
    path: '/patrimonial',
    name: '',
    component: Layout,
    children: [
    {
      path: '',
      name: 'Patrimonial',
      role: 'user',
      component: Patrimonial,
      meta: {
        icon: 'warehouse',
        title: 'Declaración Patrimonial'
      }
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login
  },
]

export const asyncRouterMap = [
  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'hand-point-right'
    }
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
