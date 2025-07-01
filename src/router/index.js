import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Team from '../views/Team.vue'
import Gallery from '../views/Gallery.vue'
import Forum from '../views/Forum.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import AuthPage from '../views/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultPage',
      component: About,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: AuthPage,
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthPage,
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: Register,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: About,
    },
    {
      path: '/team',
      name: 'TeamPage',
      component: Team,
    },
    {
      path: '/gallery',
      name: 'GalleryPage',
      component: Gallery,
    },
    {
      path: '/forum',
      name: 'ForumPage',
      component: Forum,
    },
    {
      path: '/ps',
      name: 'PersonalCenter',
      component: PersonalCenter,
      redirect: '/user/avatar',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})

export default router
