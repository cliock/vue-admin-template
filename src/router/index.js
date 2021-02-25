import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutesMap
 *没有权限要求的基页
 *可以访问所有角色
 */
export const constantRoutesMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'el-icon-s-home'}
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {title: 'Example', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {title: 'Table', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },

  {
    path: '/change',
    component: Layout,
    redirect: '/change/changePassword',
    children: [
      {
        path: 'changePassword',
        name: 'changePassword',
        hidden: true,
        component: () => import('@/views/changePassword/index'),
        meta: {'title': '修改密码'}
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {title: 'Menu1'},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {title: 'Menu1-1'}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {title: 'Menu1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {title: 'Menu1-2-1'}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {title: 'Menu1-2-2'}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {title: 'Menu1-3'}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: {title: 'menu2'}
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: {title: 'External Link', icon: 'link'}
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutesMap
})

// 根据后台数据渲染的路由
export const asyncRouterMap = [
  {
    path: '/test',
    component: Layout,
    name: '测试',
    meta: {
      role: ['demo', 'admin'],
      title: '权限测试'
    }, // 页面需要的权限
    children: [
      {
        path: 'one',
        component: () => import('@/views/test/one/index'),
        name: '测试页1',
        meta: {
          title: '权限测试页1',
          role: ['demo', 'admin']
        } // 页面需要的权限
      },
      {
        path: 'two',
        component: () => import('@/views/test/two/index'),
        name: '测试页2',
        meta: {
          title: '权限测试页2',
          role: ['demo']
        } // 页面需要的权限
      },
      {
        path: 'three',
        component: () => import('@/views/test/two/index'),
        name: '测试32',
        hidden: true,
        meta: {
          title: '权限测试页32',
          role: ['admin']
        } // 页面需要的权限
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    meta: {title: '设备'},
    redirect: '/device/list',
    children: [
      {
        path: 'list',
        name: 'list',
        hidden: true,
        component: () => import('@/views/device/list/index'),
        meta: {title: '列表'}
      }, {
        path: 'detail',
        name: 'detail',
        hidden: true,
        component: () => import('@/views/device/detail/index'),
        meta: {title: '详情'}
      }]
  },
  {
    path: '/table',
    component: Layout,
    meta: {title: '12323'},
    redirect: '/table/tablelist',
    children: [
      {
        path: 'tablelist',
        name: 'tablelist',
        hidden: true,
        component: () => import('@/views/table/tablelist/index'),
        meta: {title: 'tablelist'}
      }]
  },
  {path: '*', redirect: '/404', hidden: true}
]

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
