<script setup lang="ts">
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { Dropdown, Menu, message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const ADropdown = Dropdown
const AMenu = Menu
const AMenuItem = Menu.Item
const AMenuDivider = Menu.Divider

const userStore = useUserStore()
const router = useRouter()
const DEFAULT_AVATAR =
  'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'
const avatarUrl = computed(
  () => userStore.user.avatar || DEFAULT_AVATAR, // ✅ 自动追踪 user.avatar 变化
)

const dropdownVisible = ref(false)
let hoverArea = null
let closeTimer = null

const handleMouseEnter = () => {
  clearTimeout(closeTimer)
  if (!dropdownVisible.value) {
    dropdownVisible.value = true
  }
}

const handleMouseLeave = (event) => {
  // 检查鼠标是否仍在悬停区域内
  if (!hoverArea?.contains(event.relatedTarget as Node)) {
    closeTimer = setTimeout(() => {
      dropdownVisible.value = false
    }, 200)
  }
}

const handleProfileClick = () => {
  // 检查 Pinia 中是否有用户信息
  if (userStore.user && userStore.user.username) {
    router.push('/ps') // 跳转到个人中心
  } else {
    message.warning('请先登录')
    router.push('/login') // 跳转到登录页
  }
}

const handleLogoutClick = () => {
  if (userStore.user && userStore.user.username) {
    message.success('退出登录')
    userStore.clearUser() // 清除用户信息
    router.push('/about') // 跳转到登录页
  } else {
    message.warning('当前未登录')
  }
}

// 在挂载时获取整个悬停区域
onMounted(() => {
  hoverArea = document.querySelector('.hover-area')
})
</script>

<template>
  <div class="self-entry">
    <div class="hover-area" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <a-dropdown
        v-model:visible="dropdownVisible"
        placement="bottomRight"
        :getPopupContainer="(trigger: HTMLElement) => trigger.parentElement as HTMLElement"
        trigger="contextmenu"
      >
        <div class="avatar-trigger">
          <div class="avatar-container">
            <img class="avatar-image" :src="avatarUrl" alt="用户头像" />
          </div>
          <span class="username">{{ userStore.user?.nickname || '用户' }}</span>
          <DownOutlined class="dropdown-icon" />
        </div>

        <template #overlay>
          <div
            class="dropdown-wrapper"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <a-menu class="dropdown-menu">
              <a-menu-item key="profile" @click="handleProfileClick">
                <UserOutlined />
                <span>个人中心</span>
              </a-menu-item>

              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogoutClick">
                <LogoutOutlined />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </div>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
/* 原有样式保持不变 */
.self-entry {
  position: relative;
  margin-left: 16px;
}

.avatar-trigger {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 6px;
}

.avatar-trigger:hover {
  background-color: rgba(0, 0, 0, 0.025);
}

.avatar-container {
  width: 45px;
  height: 45px;
  top: 10px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.username {
  margin: 0 8px;
  font-size: 14px;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-icon {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  transition: transform 0.3s;
}

.ant-dropdown-open .dropdown-icon {
  transform: rotate(180deg);
}

/* 新增悬停区域样式 */
.hover-area {
  position: relative;
  display: inline-block;
}

/* 确保下拉菜单包含在悬停区域内 */
:deep(.ant-dropdown) {
  position: absolute;
  top: 100% !important;
  left: 0 !important;
  width: 100%;
}

/* 调整菜单定位 */
:deep(.ant-dropdown-menu) {
  margin-top: 4px;
}

:deep(.ant-dropdown-menu) {
  min-width: 140px;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>
