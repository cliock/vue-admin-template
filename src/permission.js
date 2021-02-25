/**
 *  配置路由规则文件
 *
 *
 */
import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // 白名单重定向

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到主页
      next({path: '/'})
      NProgress.done()
    } else {
      // 获取路由
      const hasMenus = store.getters.menus && store.getters.menus.length > 0
      if (hasMenus) {
        next()
      } else {
        try {
          // 获取用户信息, 获取菜单权限
          const {menu} = await store.dispatch('user/getInfo')
          // 基于角色生成可访问路由
          const accessRoutes = await store.dispatch('permission/GenerateRoutes', menu)
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          router.options.routes = accessRoutes

          // 设置 vuex 保存当前查看的左侧 menu 信息 (最外层父节点信息)
          store.commit('user/SET_CURRENTMENUE', to.path.split('/')[1])

          // 设置replace:true，这样导航就不会留下历史记录
          next({...to, replace: true})
        } catch (error) {
          // 删除 token 并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token时处理 */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
