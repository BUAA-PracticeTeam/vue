<script setup>
import { ref, onUnmounted } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Promotion, UserFilled, User, Crop, EditPen, Menu } from '@element-plus/icons-vue'

// 移动端菜单状态
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

// 检测移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 初始化检测
checkMobile()

// 监听窗口大小变化
window.addEventListener('resize', checkMobile)

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <el-container class="layout-container">
    <!-- PC端侧边栏 -->
    <el-aside width="200px" class="pc-sidebar">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#f0f2f5"
        :default-active="$route.path"
        text-color="#171717"
        router
        @select="closeMobileMenu"
      >
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>

        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>

          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>照片管理</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 移动端侧边栏 -->
    <el-aside
      v-if="isMobileMenuOpen"
      width="200px"
      class="mobile-sidebar"
      @click.self="closeMobileMenu"
    >
      <div class="mobile-sidebar-content">
        <div class="el-aside__logo"></div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#f0f2f5"
          :default-active="$route.path"
          text-color="#171717"
          router
          @select="closeMobileMenu"
        >
          <el-menu-item index="/article/manage">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>

          <el-sub-menu index="/user">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>

            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              <span>照片管理</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-aside>

    <el-container>
      <el-header>
        <div class="header-content">
          <!-- 移动端菜单按钮 -->
          <el-button
            v-if="isMobile"
            class="mobile-menu-btn"
            @click="toggleMobileMenu"
            :icon="Menu"
            text
          />

          <div class="header-text">
            CircleCoder提醒您：当前版本未实现JWT鉴权，请不要使用常用的密码，以免泄露
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  padding-top: 100px;
  height: 100vh;

  .el-aside {
    background-color: #f0f2f5;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
      padding-top: 150px;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-content {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 1rem;
    }

    .mobile-menu-btn {
      font-size: 1.5rem;
      color: #333;
      padding: 10px;
      min-width: 48px;
      min-height: 48px;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header-text {
      flex: 1;
      font-size: 0.9rem;
      color: #666;
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-main {
    background-color: #f4f5f6;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .layout-container {
    padding-top: 140px;

    .pc-sidebar {
      display: none;
    }

    .mobile-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;

      .mobile-sidebar-content {
        background-color: #f0f2f5;
        height: 100%;
        width: 200px;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      }

      .el-aside__logo {
        padding-top: 80px;
        height: 100px;
      }
    }

    .el-header {
      padding: 0 1rem;

      .header-text {
        font-size: 0.8rem;
        line-height: 1.4;
      }
    }

    .el-main {
      padding: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .layout-container {
    padding-top: 130px;

    .mobile-sidebar {
      width: 100vw;

      .mobile-sidebar-content {
        width: 180px;
      }
    }

    .el-header {
      padding: 0 0.8rem;

      .header-text {
        font-size: 0.75rem;
      }

      .mobile-menu-btn {
        font-size: 1.4rem;
        padding: 8px;
        min-width: 44px;
        min-height: 44px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
    }

    .el-main {
      padding: 0.8rem;
    }
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .mobile-menu-btn {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 48px;
    min-width: 48px;
  }

  .el-menu-item {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 44px;
  }
}

/* 横屏模式优化 */
@media (orientation: landscape) and (max-height: 600px) {
  .layout-container {
    padding-top: 110px;

    .el-aside__logo {
      padding-top: 60px;
      height: 80px;
    }

    .el-header {
      padding: 0 1rem;

      .header-text {
        font-size: 0.8rem;
      }
    }
  }
}

/* 减少动画效果（用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .mobile-sidebar {
    transition: none;
  }

  .mobile-menu-btn {
    transition: none;
  }
}
</style>
