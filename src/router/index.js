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
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
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
    path: '/test',
    component: () => import('@/views/test'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/userspace',
    name:'PersonalSpace',
    meta: {
      title: '个人空间',
      icon: 'personal-space'
    },
    children: [{
        path: 'userspace',
        name: '个人信息',
        component: () => import('@/views/userspace/index'),
        meta: {
          title: '个人信息',
          icon: 'dashboard'
        }
      },
      {
        path: 'favorite',
        name: '个人收藏',
        component: () => import('@/views/favorite/index'),
        meta: {
          title: '个人收藏',
          icon: 'favorite'
        }
      },
      {
        path: 'changePassword',
        name: '更改密码',
        component: () => import('@/views/changePassword/index'),
        meta: {
          title: '更改密码',
          icon: 'dashboard'
        },
        hidden:true
      }
    ]
  },

  {
    path: '/baseAnalysis',
    component: Layout,
    redirect: '/baseAnalysis',
    children: [{
      path: 'baseAnalysis',
      name: 'BaseAnalysis',
      component: () => import('@/views/baseAnalysis/index'),
      meta: {
        title: '基础信息分析',
        icon: 'analysis'
      }
    }]
  },

  {
    path: '/dataTable',
    component: Layout,
    redirect: '/dataTable/uploaderList',
    name: 'DataTable',
    meta: {
      title: '数据研究院',
      icon: 'data-college'
    },
    children: [{
        hidden: true,
        path: 'videoInfo/:id(\\d+)',
        name: 'VideoInfo',
        component: () => import('@/views/dataTable/VideoInfo'),
        meta: {
          title: '视频详情',
          noCache: true
        },
      },
      {
        hidden: true,
        path: 'uploaderInfo/:id(\\d+)',
        name: 'UploaderInfo',
        component: () => import('@/views/dataTable/uploaderInfo'),
        meta: {
          title: 'up主详情',
          noCache: true
        },
      },
      {
        path: 'uploaderList',
        name: 'UploaderList',
        component: () => import('@/views/dataTable/uploaderList'),
        meta: {
          title: 'up主列表',
          icon: 'uploader'
        },
      },
      {
        path: 'videoList',
        name: 'VideoList',
        component: () => import('@/views/dataTable/VideoList'),
        meta: {
          title: '视频区',
          icon: 'today-video'
        }
      }
    ]
  },

  // {
  //   path: '/currentBili',
  //   component: Layout,
  //   redirect: '/currentBili/abstract',
  //   name: 'CurrentBili',
  //   meta: {
  //     title: '当下B站',
  //     icon: 'bili'
  //   },
  //   children: [{
  //       path: 'abstract',
  //       name: '简介',
  //       component: () => import('@/views/bili/abstract/index'),
  //       meta: {
  //         title: '简介',
  //         icon: 'abstract'
  //       },
  //     },
  //   ]
  // },

  // {
  //   path: '/detect',
  //   redirect: '/detect/doDetect',
  //   name:'Detect',
  //   component: Layout,
  //   meta: {
  //     title: '检测空间',
  //     icon: 'detect'
  //   },
  //   children: [{
  //     path: '/doDetect',
  //     name: 'DoDetect',
  //     component: () => import('@/views/detect/doDetect/index'),
  //     meta: {
  //       title: '检测选择',
  //       icon: 'select',
  //     }
  //   },
  //   {
  //     path: '/detectList',
  //     name: 'DetectList',
  //     component: () => import('@/views/detect/detectList/index'),
  //     meta: {
  //       title: '检测列表',
  //       icon: 'list',
  //     }
  //   }]
  // },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
