<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user.js'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { defineOptions } from 'vue'

defineOptions({
  name: 'LoginPage', // 直接设置组件名称
})

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: '',
  password: '',
})

const loading = ref(false)

const validateForm = () => {
  let isValid = true
  errors.value = { username: '', password: '' }

  if (!form.value.username) {
    errors.value.username= '请输入用户名'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.value.username)) {
    errors.value.username = '请输入有效的用户名'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = '密码长度不能少于6位'
    isValid = false
  }
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    const response = await axios.post('/api/login/', {
      username: form.value.username,
      password: form.value.password,
    })
    // 使用 Pinia store 存储认证信息
    const user = response.data.user
    userStore.setUser({username: user.username,
      nickname: user.nickname,
      email: user.email,
      signature: user.signature,
      password: user.password,
      avatar: user.avatar,
      introduction: user.introduction,
      photo: user.photo,
      permission: user.permission,})

    if (response.data.error_num) {
      message.error(response.data.msg)
    } else {
      router.push('/about')
      message.success('登录成功')
    }
  } catch (error) {
    console.error('登录失败:', error)
    const errorMsg = '登录失败，请检查用户名和密码'
    message.error(errorMsg)
    message.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">用户登录</h1>
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model.trim="form.username"
            type="text"
            placeholder="请输入用户名"
            class="form-input"
            :class="{ 'input-error': errors.username }"
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model.trim="form.password"
            type="password"
            placeholder="请输入密码"
            class="form-input"
            :class="{ 'input-error': errors.password }"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-button" :disabled="loading">
            <span v-if="!loading">登 录</span>
            <span v-else class="loading-text">登录中...</span>
          </button>
        </div>

        <div class="auth-footer">
          <span>还没有账号？</span>
          <router-link to="/register" class="link-button">立即注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/img/loginBG.jpg');
  background-size: cover; /* 关键属性：让图片完整覆盖容器 */

  background-repeat: no-repeat; /* 禁止重复平铺 */
  background-position: center; /* 图片居中显示 */
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  animation: fadeIn 0.5s ease;
}

.auth-title {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  outline: none;
}

.input-error {
  border-color: #ff4d4f;
}

.input-error:focus {
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}

.error-message {
  display: block;
  margin-top: 6px;
  color: #ff4d4f;
  font-size: 12px;
}

.form-actions {
  margin-top: 30px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.loading-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loading-text::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.auth-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  transition: all 0.2s;
}

.link-button:hover {
  color: #764ba2;
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
