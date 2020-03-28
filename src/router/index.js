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
    redirect: '/baseAnalysis',
    children: [{
      path: 'baseAnalysis',
      name: 'BaseAnalysis',
      component: () => import('@/views/baseAnalysis/index'),
      meta: {
        title: '基础信息分析',
        icon: 'analysis',
      }
    }]
  },
]
//////////////////////////////////////////////
export const asyncRoutes = [
  {
    path: '/space',
    component: Layout,
    redirect: '/space/userspace',
    name:'PersonalSpace',
    meta: {
      title: '个人空间',
      icon: 'personal-space',
      // roles: ['admin', 'editor']
    },
    children: [{
        path: 'userspace',
        name: 'UserSpace',
        component: () => import('@/views/userspace/index'),
        meta: {
          title: '个人信息',
          icon: 'dashboard',
          roles: ['admin', 'viewer','manager']
        }
      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: () => import('@/views/favorite/index'),
        meta: {
          title: '个人收藏',
          icon: 'favorite',
          roles: ['viewer']
        }
      },
      {
        path: 'changePassword',
        name: 'ChangePassword',
        component: () => import('@/views/changePassword/index'),
        meta: {
          title: '更改密码',
          icon: 'dashboard',
          roles: ['admin', 'viewer','manager']
        },
        hidden:true
      }
    ]
  },
  {
    path: '/dataTable',
    component: Layout,
    redirect: '/dataTable/uploaderList',
    name: 'DataTable',
    meta: {
      title: '数据研究院',
      icon: 'data-college',
      roles: ['viewer']
    },
    children: [{
        hidden: true,
        path: 'videoInfo/:id(\\d+)',
        name: 'VideoInfo',
        component: () => import('@/views/dataTable/VideoInfo'),
        meta: {
          title: '视频详情',
          noCache: true,
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
  {
    path: '/bili_hot',
    component: Layout,
    redirect: '/bili_hot',
    children: [{
        path: 'bili_hot',
        name: '当下b站',
        component: () => import('@/views/currentHot/index'),
        meta: {
          title: '当下B站',
          icon: 'bili_hot',
          roles: ['viewer']
        },
      },
    ]
  },
  ///////////////////////////Mo//////////////////
  {
    path: '/moRoles',
    redirect: '/moRoles/viewer',
    name:'角色管理',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: 'mo_roles',
      roles:['admin','manager']
    },
    children: [{
      path: 'viewer',
      name: 'Viewer',
      component: () => import('@/views/mo/roles/user/index'),
      meta: {
        title: '用户管理',
        icon: 'mo_roles_user',
        roles: ['admin','manager']
      }
    },
    {
      path: 'manage',
      name: 'Manage',
      component: () => import('@/views/mo/roles/manage/index'),
      meta: {
        title: '管理员管理',
        icon: 'mo_roles_manage',
        roles: ['manager']
      }
    }
  ]
  },
   {
    path: '/manage_api',
    component: Layout,
    redirect: '/manage_api',
    children: [{
        path: 'manage_api',
        name: 'api管理',
        component: () => import('@/views/mo/apiManage/index'),
        meta: {
          title: 'api管理',
          icon: 'api',
          roles: ['admin','manager']
        },
      },
    ]
  },
  {
    path: '/detect',
    redirect: '/detect/info',
    name:'侦测管理',
    component: Layout,
    meta: {
      title: '侦测管理',
      icon: 'detect',
      roles: ['admin','manager']
    },
    children: [{
      path: 'info',
      name: '侦测详情',
      component: () => import('@/views/mo/detect/detectInfo/index'),
      meta: {
        title: '侦测详情',
        icon: 'mo_detect_data',
      }
    },
    {
      path: 'manage',
      name: 'Manage',
      component: () => import('@/views/mo/detect/detectManage/index'),
      meta: {
        title: '侦测管理',
        icon: 'mo_detect_manage',
      }
    }
  ]
  },
  {
    path: '/announcement',
    component: Layout,
    redirect: '/announcement',
    children: [{
        path: 'announcement',
        name: '公告管理',
        component: () => import('@/views/mo/announcement/index'),
        meta: {
          title: '公告管理',
          icon: 'announce',
          roles: ['admin','manager']
        },
      },
    ]
  },
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
