import {asyncRouterMap, constantRoutesMap} from '@/router'

const asyncRouterArr = asyncRouterMap

/**
 * 修改路由表中 route 的名字
 * @param route: 后台返回的路由, 带名字
 */
function resetRoute (route) {
  let asyncRoute = {}
  for (let j = 0; j < asyncRouterArr.length; j++) {
    asyncRoute = asyncRouterArr[j]
    if (asyncRoute['path'] === `/${route['key']}`) {
      asyncRoute['meta']['title'] = route['name']
      if (route['icon']) {
        asyncRoute['meta']['icon'] = route['icon']
      }
      asyncRoute['name'] = route['name']
      asyncRoute['children'] = resetChildrenRoute(asyncRoute, route)
      return asyncRoute
    }
  }
  return false
}

/**
 * 递归修改路由表中子路由 名字
 * @param asyncRoute : router.js中的权限 constantRoutesMap 遍历的每个router的children子集
 * @param route: 后台路由表 memu 循环遍历的children子集
 * @returns {[]} 修改子集名后的 asyncRoute 数组
 */
function resetChildrenRoute (asyncRoute, route) {
  const newChildrenRoute = []

  if (route.children && route.children.length > 0 && asyncRoute.children && asyncRoute.children.length > 0) {
    // 后台返回了子路由数据, 并且路由表中有对应子路由数据时 才进行操作

    for (let k = 0; k < asyncRoute.children.length; k++) {
      const asyncChildren = asyncRoute.children[k]
      let flag = true
      for (let i = 0; i < route.children.length; i++) {
        const routeChildren = route.children[i]
        if (asyncChildren['path'] === `${routeChildren.key}`) {
          asyncChildren['meta']['title'] = routeChildren.name
          asyncChildren['name'] = routeChildren.name
          asyncChildren['hidden'] = false
          asyncChildren['children'] = resetChildrenRoute(asyncChildren, routeChildren)
          newChildrenRoute.push(asyncChildren)
          flag = false
        }
        flag = false
      }
      if (flag) {
        newChildrenRoute.push(asyncChildren)
      }
    }
  } else if (asyncRoute.children && asyncRoute.children.length > 0) {
    for (let k = 0; k < asyncRoute.children.length; k++) {
      const asyncChildren = asyncRoute.children[k]
      newChildrenRoute.push(asyncChildren)
    }
  }
  return newChildrenRoute
}

/**
 * 创建后台返回的左侧路由
 * @param rolesArr: 路由表
 * @returns {[]} 新的路由表
 */
function createRoutes (rolesArr) {
  const accessedRouters = []
  let resetRouteObj = null
  for (const i in rolesArr) {
    resetRouteObj = resetRoute(rolesArr[i])
    if (resetRouteObj) {
      accessedRouters.push(resetRouteObj)
    }
  }

  // 首页重定向
  // const homePath = {
  //   path: '/',
  //   redirect: `/${rolesArr[0]['key']}`
  // }

  // 404 (最后要拼上一个404页面)
  const notFount = {path: '*', redirect: '/404', hidden: true}

  // accessedRouters.unshift(homePath)
  accessedRouters.push(notFount)

  return accessedRouters
}

const state = {
  routers: constantRoutesMap,
  addRouters: []
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutesMap.concat(routers)
  }
}
const actions = {
  GenerateRoutes ({commit}, data) {
    return new Promise(resolve => {
      const roles = data

      const accessedRouters = createRoutes(roles)

      commit('SET_ROUTERS', accessedRouters)
      resolve(state.routers)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
