<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import SelfEntry from '@/components/SelfEntry.vue'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const userStore = useUserStore()
const router = useRouter()

// 窄屏菜单展开状态
const mobileMenuOpen = ref(false)
// 窄屏菜单显示状态
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleProfileClick = () => {
  // 检查 Pinia 中是否有用户信息
  if (userStore.user && userStore.user.username) {
    router.push('/ps') // 跳转到个人中心
  } else {
    message.warning('请先登录')
    router.push('/login') // 跳转到登录页
  }
  mobileMenuOpen.value = false // 关闭菜单
}

const handleLogoutClick = () => {
  if (userStore.user && userStore.user.username) {
    message.success('退出登录')
    userStore.clearUser() // 清除用户信息
    router.push('/') // 跳转到首页
  } else {
    message.warning('当前未登录')
    router.push('/login') // 跳转到登录页
  }
  mobileMenuOpen.value = false // 关闭菜单
}

// 窗口尺寸
const windowWidth = ref(window.innerWidth)

// 更新窗口尺寸
const updateWindowSize = () => {
  windowWidth.value = window.innerWidth
}

// 添加和移除窗口大小改变监听器
onMounted(() => {
  window.addEventListener('resize', updateWindowSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowSize)
})

watch(
  () => windowWidth.value,
  (newWidth) => {
    // 当窗口宽度变化时，自动关闭菜单
    // console.log('Window width changed:', newWidth)
    if (newWidth > 960) {
      mobileMenuOpen.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <header>
    <div class="container header-container">
      <router-link to="/" class="logo">
        <img src="/logo.png" alt="Logo" class="logo-img" />
        <span>蒲公英-乡野航迹实践队</span>
      </router-link>
      <nav>
        <!-- 宽屏菜单 -->
        <ul class="nav-menu">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/team">队员介绍</router-link>
          </li>
          <li>
            <router-link to="/gallery">精彩回顾</router-link>
          </li>
          <li>
            <router-link to="/heritage">非遗介绍</router-link>
          </li>
          <!-- <li>
            <router-link to="/forum">交流论坛</router-link>
          </li> -->
        </ul>

        <!-- 窄屏菜单按钮 -->
        <button class="menu-toggle" @click="toggleMobileMenu">
          <span v-if="!mobileMenuOpen">
            <MenuOutlined />
          </span>
          <span v-else>
            <CloseOutlined />
          </span>
        </button>

        <!-- 窄屏下拉菜单 -->
        <div class="mobile-nav" :class="{ open: mobileMenuOpen }">
          <ul class="mobile-nav-menu">
            <li>
              <router-link to="/" @click="toggleMobileMenu">首页</router-link>
            </li>
            <li>
              <router-link to="/team" @click="toggleMobileMenu">队员介绍</router-link>
            </li>
            <li>
              <router-link to="/gallery" @click="toggleMobileMenu">精彩回顾</router-link>
            </li>
            <li>
              <router-link to="/heritage" @click="toggleMobileMenu">非遗介绍</router-link>
            </li>
            <!-- <li>
              <router-link to="/forum" @click="toggleMobileMenu">交流论坛</router-link>
            </li> -->
            <li>
              <router-link to="/ps" @click="handleProfileClick">个人中心</router-link>
            </li>
            <li v-if="userStore.user && userStore.user.username">
              <router-link to="/login" @click="handleLogoutClick">退出登录</router-link>
            </li>
            <li v-else>
              <router-link to="/login" @click="toggleMobileMenu">登录/注册</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="nav-right">
        <SelfEntry />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background: linear-gradient(135deg, #297ef2 0%, #74ec5c 51%, #b52cbf 100%);
  color: white;
  padding: 1rem 0;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  opacity: 90%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
}

.logo i {
  margin-right: 20px;
  color: #ffcc00;
}

.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 2rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

nav ul li a:hover {
  color: #ffcc00;
}

nav ul li a.router-link-exact-active {
  color: #ffcc00;
}

nav ul li a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: #ffcc00;
  bottom: 0;
  left: 0;
  transition: width 0.3s ease;
}

nav ul li a:hover:after,
nav ul li a.router-link-exact-active:after {
  width: 100%;
}

/* 窄屏菜单按钮 */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* 窄屏下拉菜单 */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #74ec5c;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}

.mobile-nav.open {
  max-height: 400px;
}

.mobile-nav-menu {
  display: block;
  padding: 0.5rem 0;
}

nav .mobile-nav-menu li {
  margin: 0;
}

nav .mobile-nav-menu li a {
  display: block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s;
}

nav .mobile-nav-menu li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav-menu li a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
}

nav .mobile-nav-menu li a:after,
nav .mobile-nav-menu li a:hover:after,
nav .mobile-nav-menu li a.router-link-exact-active:after {
  content: none;
}

.nav-right {
  align-content: center;
}

@media (max-width: 960px) {
  .nav-menu {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .nav-right {
    display: none;
  }
}
</style>
