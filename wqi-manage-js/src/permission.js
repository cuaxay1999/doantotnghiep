import router from './routers'
import store from './stores'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404', '/403', '/home', '/', 'Article', 'ArticleDetail']

const notAllowedList = ['/login']

// eslint-disable-next-line space-before-function-paren
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // check isLogin
  const hasToken = getToken()

  if (hasToken) {
    if (notAllowedList.includes(to.path)) {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      if (store.getters['user/name']) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfor')
          next()
        } catch (error) {
          console.log(error)
          await store.dispatch('user/resetToken')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1 || whiteList.indexOf(to.name) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
