import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultPage',
      component: About,
      meta: { title: '首页 - BUAA Practice Team' },
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/AuthPage.vue'),
      meta: { title: '登录 - BUAA Practice Team' },
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('../views/AuthPage.vue'),
      meta: { title: '认证 - BUAA Practice Team' },
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: About,
      meta: { title: '关于我们 - BUAA Practice Team' },
    },
    {
      path: '/team',
      name: 'TeamPage',
      component: () => import('../views/Team.vue'),
      meta: { title: '团队 - BUAA Practice Team' },
    },
    {
      path: '/gallery',
      name: 'GalleryPage',
      component: () => import('../views/Gallery.vue'),
      meta: { title: '画廊 - BUAA Practice Team' },
    },
    {
      path: '/heritage',
      name: 'HeritagePage',
      component: () => import('../views/heritage/Heritage.vue'),
      meta: { title: '非遗 - BUAA Practice Team' },
    },
    {
      path: '/heritage/tie-dye',
      name: 'HeritageTieDye',
      component: () => import('../views/heritage/HeritageTieDye.vue')
    },
    {
      path: '/heritage/paper-cut',
      name: 'HeritagePaperCut',
      component: () => import('../views/heritage/HeritagePaperCut.vue')
    },
    {
      path: '/forum',
      name: 'ForumPage',
      component: () => import('../views/Forum.vue'),
      meta: { title: '论坛 - BUAA Practice Team' },
    },
    {
      path: '/ps',
      name: 'PersonalCenter',
      component: () => import('../views/PersonalCenter.vue'),
      redirect: '/user/avatar',
      meta: { title: '个人中心 - BUAA Practice Team' },
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
          meta: { title: '文章管理 - BUAA Practice Team' },
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
          meta: { title: '个人资料 - BUAA Practice Team' },
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
          meta: { title: '头像设置 - BUAA Practice Team' },
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
          meta: { title: '密码修改 - BUAA Practice Team' },
        },
      ],
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: () => import('@/views/article/ArticleDetail.vue'),
      meta: { title: '文章详情 - BUAA Practice Team' },
    },
    {
      path: '/docs',
      name: 'DocumentationPage',
      component: () => import('@/views/Documentation.vue'),
      meta: { title: '功能文档 - BUAA Practice Team' },
    },
    {
      path: '/charity',
      name: 'CharityFundPage',
      component: () => import('@/views/CharityFund.vue'),
      meta: { title: '爱心基金 - BUAA Practice Team' },
    },
  ],
})

// 路由守卫：自动更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
