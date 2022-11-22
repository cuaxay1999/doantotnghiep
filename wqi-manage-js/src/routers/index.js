import Vue from 'vue'
import VueRouter from 'vue-router'
import AmdinLayout from '@/layout/AdminLayout'
import i18n from '@/plugins/i18n'
import { ROLES } from '@/utils/constants'

Vue.use(VueRouter)

const allRoutes = [
  {
    path: '/',
    component: AmdinLayout,
    meta: { title: i18n.t('router.home'), icon: 'el-icon-s-home' },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: i18n.t('router.home') }
      }
    ]
  },
  {
    path: '/devices',
    component: AmdinLayout,
    meta: { title: i18n.t('router.device'), icon: 'el-icon-cpu', roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
    children: [
      {
        path: '',
        name: 'DeviceList',
        component: () => import('@/views/device/List'),
        meta: { title: i18n.t('router.device') }
      },
      {
        path: 'add',
        name: 'DeviceAdd',
        component: () => import('@/views/device/DeviceAdd'),
        meta: { title: i18n.t('router.device_add'), roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'edit/:id',
        name: 'DeviceEdit',
        hidden: true,
        component: () => import('@/views/device/DeviceEdit'),
        meta: { title: 'Update thiết bị', roles: [ROLES.SUPER_ADMIN] }
      }
    ]
  },
  {
    path: '/users',
    component: AmdinLayout,
    meta: { title: i18n.t('router.user'), icon: 'el-icon-s-custom', roles: [ROLES.SUPER_ADMIN] },
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/views/user/UserList'),
        meta: { title: i18n.t('router.user') }
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/UserAdd'),
        meta: { title: i18n.t('router.user_add') }
      },
      {
        path: 'edit/:id',
        name: 'UserEdit',
        component: () => import('@/views/user/UserEdit'),
        meta: { title: 'Chỉnh sửa người dùng' },
        hidden: true
      }
    ]
  },
  {
    path: '/articles',
    component: AmdinLayout,
    meta: { title: i18n.t('router.article'), icon: 'el-icon-reading' },
    children: [
      {
        path: '',
        name: 'Article',
        component: () => import('@/views/article/Article'),
        meta: { title: i18n.t('router.article') }
      },
      {
        path: 'add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/ArticleAdd'),
        meta: { title: i18n.t('router.article_add'), roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] }
      },
      {
        path: ':id(\\d+)',
        name: 'ArticleDetail',
        hidden: true,
        component: () => import('@/views/article/ArticleDetail'),
        meta: { title: i18n.t('router.article') }
      }
    ]
  },
  {
    path: '/infors',
    component: AmdinLayout,
    meta: { title: i18n.t('router.infor'), icon: 'el-icon-place', roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
    children: [
      {
        path: '',
        name: 'WQIInfor',
        component: () => import('@/views/infor/Infor'),
        meta: { title: i18n.t('router.infor') }
      }
    ]
  },

  {
    path: '/login',
    hidden: true,
    meta: { title: i18n.t('router.login') },
    component: () => import('@/views/auth/Login')
  }
]

// const notFoundRoutes = [
//   {
//     path: '/',
//     redirect: '/parts',
//     hidden: true
//   }
// ]

const createRouter = () => {
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch((err) => {
      if (VueRouter.isNavigationFailure(err)) {
        return err
      }
      return Promise.reject(err)
    })
  }

  // allRoutes = allRoutes.concat(notFoundRoutes)

  const routes = allRoutes

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
