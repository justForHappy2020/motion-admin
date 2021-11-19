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
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 默认路由
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: {
                title: '首页',
                icon: 'dashboard'
            }
        }]
    },
    {
        path: '/course',
        component: Layout,
        children: [{
            path: 'index',
            name: 'course',
            component: () =>
                import ('@/views/courseManager/index'),
            meta: {
                title: '课程管理',
                icon: 'el-icon-s-management'
            }
        }]
    },
    {
        path: '/courseCategory',
        component: Layout,
        children: [{
            path: 'index',
            name: 'courseCategory',
            component: () =>
                import ('@/views/courseCategory/index'),
            meta: {
                title: '课程分类管理',
                icon: 'el-icon-s-management'
            }
        }]
    },
    {
        path: '/userManager',
        component: Layout,
        children: [{
            path: 'index',
            name: 'userManager',
            component: () =>
                import ('@/views/userManager/index'),
            meta: {
                title: '用户管理',
                icon: 'el-icon-user-solid'
            }
        }],
    },
    {
        path: '/action',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'index',
            name: 'action',
            component: () =>
                import ('@/views/action/index'),
            meta: {
                title: '动作管理',
                icon: 'el-icon-chicken'
            }
        }]
    },
    {
        path: '/feedback',
        component: Layout,
        children: [{
            path: 'index',
            name: 'feedback',
            component: () =>
                import ('@/views/feedback/index'),
            meta: {
                title: '反馈管理',
                icon: 'el-icon-chat-line-square'
            }
        }],
    },
    {
        path: '/articleAdminManager',
        component: Layout,
        children: [{
            path: 'index',
            name: 'articleAdminManage',
            component: () =>
                import ('@/views/articleAdminManager/index'),
            meta: {
                title: '管理员文章管理',
                icon: 'el-icon-collection'
            }
        }],
    },
    {
        path: '/articleUserManager',
        component: Layout,
        children: [{
            path: 'index',
            name: 'articleUserManage',
            component: () =>
                import ('@/views/articleUserManager/index'),
            meta: {
                title: '用户文章管理',
                icon: 'el-icon-collection'
            }
        }],
    },
    {
        path: '/publish',
        component: Layout,
        children: [{
            path: 'index',
            name: 'publish',
            component: () =>
                import ('@/views/publish/index'),
            meta: {
                title: '发布文章',
                icon: 'el-icon-notebook-1'
            }
        }],
    },
    {
        path: '/navigation',
        component: Layout,
        children: [{
            path: 'index',
            name: 'navigation',
            component: () =>
                import ('@/views/navigation/index'),
            meta: {
                title: '首页导航管理',
                icon: 'el-icon-bicycle'
            }
        }],
    },
    {
        path: '/certification',
        component: Layout,
        children: [{
            path: 'index',
            name: 'certification',
            component: () =>
                import ('@/views/certification/index'),
            meta: {
                title: '认证申请管理',
                icon: 'el-icon-finished'
            }
        }],
    },
    {
        path: '/orderManager',
        component: Layout,
        children: [{
            path: 'index',
            name: 'orderManager',
            component: () =>
                import ('@/views/orderManager/index'),
            meta: {
                title: '订单管理',
                icon: 'el-icon-s-order'
            }
        }]
    },
    {
        path: '/commodityManager',
        component: Layout,
        children: [{
            path: 'index',
            name: 'commodityManager',
            component: () =>
                import ('@/views/commodityManager/index'),
            meta: {
                title: '商品管理',
                icon: 'el-icon-goods'
            }
        }]
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export const addRouter = [{
        path: '/publish',
        component: Layout,
        children: [{
            path: 'index',
            name: 'publish',
            component: () =>
                import ('@/views/publish/index'),
            meta: {
                title: '发布文章',
                icon: 'el-icon-collection',
                role: ['user']
            }
        }],
    },
    {
        path: '/articleAdminManager',
        component: Layout,
        children: [{
            path: 'index',
            name: 'articleAdminManage',
            component: () =>
                import ('@/views/articleAdminManager/index'),
            meta: {
                title: '管理员文章管理',
                icon: 'el-icon-collection',
                role: ['admin']
            }
        }],
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