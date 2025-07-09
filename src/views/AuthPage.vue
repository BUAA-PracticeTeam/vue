<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'AuthPage',
})

const router = useRouter()
const userStore = useUserStore()

// 状态管理
const isSignUpActive = ref(false)

// 表单数据
const signInForm = ref({
  username: '',
  password: '',
})

const signUpForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 错误信息
const signInErrors = ref({
  username: '',
  password: '',
})

const signUpErrors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 加载状态 - 从 store 获取
const signInLoading = computed(() => userStore.loginLoading)
const signUpLoading = computed(() => userStore.registerLoading)

// 切换登录/注册面板
const toggleSignUp = (active) => {
  isSignUpActive.value = active
  // 清空错误信息
  signInErrors.value = { username: '', password: '' }
  signUpErrors.value = { username: '', email: '', password: '', confirmPassword: '' }
}

// 登录表单验证
const validateSignInForm = () => {
  let isValid = true
  signInErrors.value = { username: '', password: '' }

  if (!signInForm.value.username) {
    signInErrors.value.username = '请输入用户名'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]+$/.test(signInForm.value.username)) {
    signInErrors.value.username = '请输入有效的用户名'
    isValid = false
  }

  if (!signInForm.value.password) {
    signInErrors.value.password = '请输入密码'
    isValid = false
  } else if (signInForm.value.password.length < 6) {
    signInErrors.value.password = '密码长度不能少于6位'
    isValid = false
  }

  return isValid
}

// 注册表单验证
const validateSignUpForm = () => {
  let isValid = true
  signUpErrors.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  // 验证用户名
  if (!signUpForm.value.username) {
    signUpErrors.value.username = '请输入用户名'
    isValid = false
  } else if (signUpForm.value.username.length < 3) {
    signUpErrors.value.username = '用户名长度不能少于3位'
    isValid = false
  }

  // 验证邮箱
  if (!signUpForm.value.email) {
    signUpErrors.value.email = '请输入邮箱'
    isValid = false
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(signUpForm.value.email)) {
    signUpErrors.value.email = '请输入有效的邮箱地址'
    isValid = false
  }

  // 验证密码
  if (!signUpForm.value.password) {
    signUpErrors.value.password = '请输入密码'
    isValid = false
  } else if (signUpForm.value.password.length < 6) {
    signUpErrors.value.password = '密码长度不能少于6位'
    isValid = false
  }

  // 验证确认密码
  if (!signUpForm.value.confirmPassword) {
    signUpErrors.value.confirmPassword = '请确认密码'
    isValid = false
  } else if (signUpForm.value.password !== signUpForm.value.confirmPassword) {
    signUpErrors.value.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  return isValid
}

// 登录处理
const handleSignIn = async () => {
  if (!validateSignInForm()) return

  const result = await userStore.login({
    username: signInForm.value.username,
    password: signInForm.value.password,
  })

  if (result.success) {
    router.push('/')
  }
}

// 注册处理
const handleSignUp = async () => {
  // if (!validateSignUpForm()) return

  // const result = await userStore.register({
  //   username: signUpForm.value.username,
  //   email: signUpForm.value.email,
  //   password: signUpForm.value.password,
  // })

  // if (result.success) {
  //   // 注册成功后切换到登录面板
  //   isSignUpActive.value = false
  //   // 清空注册表单
  //   signUpForm.value = {
  //     username: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   }
  // }
  ElMessage.warning('未启用注册功能，请联系管理员')
  return
}
</script>

<template>
  <div class="authPage">
    <div class="container" :class="{ 'right-panel-active': isSignUpActive }">
      <!-- 注册表单 -->
      <div class="container__form container--signup">
        <form class="form" @submit.prevent="handleSignUp">
          <h2 class="form__title">注册</h2>
          <input
            v-model="signUpForm.username"
            type="text"
            placeholder="用户名"
            class="input"
            :class="{ 'input-error': signUpErrors.username }"
            required
          />
          <span v-if="signUpErrors.username" class="error-message">{{
            signUpErrors.username
          }}</span>

          <input
            v-model="signUpForm.email"
            type="email"
            placeholder="邮箱"
            class="input"
            :class="{ 'input-error': signUpErrors.email }"
            required
          />
          <span v-if="signUpErrors.email" class="error-message">{{ signUpErrors.email }}</span>

          <input
            v-model="signUpForm.password"
            type="password"
            placeholder="密码"
            class="input"
            :class="{ 'input-error': signUpErrors.password }"
            required
          />
          <span v-if="signUpErrors.password" class="error-message">{{
            signUpErrors.password
          }}</span>

          <input
            v-model="signUpForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            class="input"
            :class="{ 'input-error': signUpErrors.confirmPassword }"
            required
          />
          <span v-if="signUpErrors.confirmPassword" class="error-message">{{
            signUpErrors.confirmPassword
          }}</span>

          <button type="submit" class="btn" :disabled="signUpLoading">
            <span v-if="!signUpLoading">注册</span>
            <span v-else>注册中...</span>
          </button>
        </form>
      </div>

      <!-- 登录表单 -->
      <div class="container__form container--signin">
        <form class="form" @submit.prevent="handleSignIn">
          <h2 class="form__title">登录</h2>
          <input
            v-model="signInForm.username"
            type="text"
            placeholder="用户名"
            class="input"
            :class="{ 'input-error': signInErrors.username }"
            required
          />
          <span v-if="signInErrors.username" class="error-message">{{
            signInErrors.username
          }}</span>

          <input
            v-model="signInForm.password"
            type="password"
            placeholder="密码"
            class="input"
            :class="{ 'input-error': signInErrors.password }"
            required
          />
          <span v-if="signInErrors.password" class="error-message">{{
            signInErrors.password
          }}</span>

          <a href="#" class="link">忘记密码?</a>
          <button type="submit" class="btn" :disabled="signInLoading">
            <span v-if="!signInLoading">登录</span>
            <span v-else>登录中...</span>
          </button>
        </form>
      </div>

      <!-- 覆盖层 -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" @click="toggleSignUp(false)">登录</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" @click="toggleSignUp(true)">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 758px;
  --max-height: 420px;

  font-size: 16px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
}

.authPage {
  padding-top: 100px;
  align-items: center;
  background-color: wheat;
  display: flex;
  height: 100vh;
  justify-content: center;
  background-image: url('@/assets/img/mountain.png');
  background-size: cover; /* 关键属性：让图片完整覆盖容器 */
  background-repeat: no-repeat; /* 禁止重复平铺 */
  background-position: center; /* 图片居中显示 */
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  top: -50px;
  /* background-image: url('@/assets/img/mountain.png'); */
  background-color: #aed4f0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2rem;
  box-shadow:
    0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 450px;
  max-width: var(--max-width);
  position: relative;
  width: 50%;
  overflow: hidden;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
  background-color: rgba(192, 221, 249, 0.9);
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
  backdrop-filter: blur(5px);
}

.container.right-panel-active .container--signin {
  opacity: 0;
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: rgba(193, 221, 249, 0.9);
  backdrop-filter: blur(5px);
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background: linear-gradient(135deg, var(--lightblue) 0%, #5cb5ec 100%);
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
  background-image: url('@/assets/img/mountain.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  left: 0;
  transform: translateX(-20%);
  border-bottom-left-radius: 2rem;
  border-top-left-radius: 2rem;
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: #9696f2;
  background-image: linear-gradient(90deg, #5cb5ec 0%, #93ced4 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 3rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active:not(:disabled) {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

.input-error {
  border: 1px solid #ff4d4f;
  background-color: #fff2f0;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin: 0.2rem 0;
  text-align: left;
  width: 100%;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
