import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  userLoginService,
  userRegisterService,
  userUpdateInfoService,
  userUpdateAvatarService,
} from '@/api/user.js'
import { message } from 'ant-design-vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息（包含所有字段）
    const user = ref({
      username: '',
      nickname: '',
      password: '',
      email: '',
      signature: '',
      avatar: '',
      introduction: '',
      photo: '',
      work: '',
      permission: 0,
    })

    // 加载状态
    const loginLoading = ref(false)
    const registerLoading = ref(false)

    // 获取完整用户信息
    const getUser = () => {
      return user.value
    }

    // 设置用户信息（支持部分更新）
    const setUser = (userData) => {
      // user.value = { ...user.value, ...userData }
      Object.assign(user.value, userData)
    }

    // 清空用户信息（用于登出）
    const clearUser = () => {
      user.value = {
        username: '',
        nickname: '',
        password: '',
        email: '',
        signature: '',
        avatar: '',
        introduction: '',
        photo: '',
        work: '',
        permission: 0,
      }
    }

    // 登录业务逻辑
    const login = async (loginData) => {
      loginLoading.value = true

      try {
        const response = await userLoginService(loginData)

        if (response.data.error_num) {
          message.error(response.data.msg)
          return { success: false, message: response.data.msg }
        }

        // 使用 Pinia store 存储认证信息
        const userData = response.data.user
        setUser({
          username: userData.username,
          nickname: userData.nickname,
          email: userData.email,
          signature: userData.signature,
          password: userData.password,
          avatar: userData.avatar,
          introduction: userData.introduction,
          photo: userData.photo,
          work: userData.work,
          permission: userData.permission,
        })

        message.success('登录成功')
        return { success: true, message: '登录成功' }
      } catch (error) {
        console.error('登录失败:', error)
        const errorMsg = '登录失败，请检查用户名和密码'
        message.error(errorMsg)
        return { success: false, message: errorMsg }
      } finally {
        loginLoading.value = false
      }
    }

    // 注册业务逻辑
    const register = async (registerData) => {
      registerLoading.value = true

      try {
        const response = await userRegisterService(registerData)

        if (response.data.error_num) {
          message.error(response.data.msg)
          return { success: false, message: response.data.msg }
        }

        message.success('注册成功')
        return { success: true, message: '注册成功' }
      } catch (error) {
        console.error('注册失败:', error)
        const errorMsg = '注册失败，请稍后重试'
        message.error(errorMsg)
        return { success: false, message: errorMsg }
      } finally {
        registerLoading.value = false
      }
    }

    // 更新用户信息业务逻辑
    const updateUserInfo = async (userInfo) => {
      try {
        const response = await userUpdateInfoService(userInfo)

        if (response.data.error_num) {
          message.error(response.data.msg)
          return { success: false, message: response.data.msg }
        }

        // 更新本地用户信息
        setUser({
          username: userInfo.username,
          nickname: userInfo.nickname,
          email: userInfo.email,
          signature: userInfo.signature,
          introduction: userInfo.introduction,
          work: userInfo.work,
        })

        message.success('修改成功')
        return { success: true, message: '修改成功' }
      } catch (error) {
        console.error('更新用户信息失败:', error)
        const errorMsg = '更新失败，请稍后重试'
        message.error(errorMsg)
        return { success: false, message: errorMsg }
      }
    }

    // 更新用户头像业务逻辑
    const updateAvatar = async (avatarUrl) => {
      try {
        const response = await userUpdateAvatarService(avatarUrl, user.value.username)

        if (response.data.error_num) {
          message.error(response.data.msg)
          return { success: false, message: response.data.msg }
        }

        // 更新本地用户头像
        setUser({ avatar: avatarUrl })

        message.success('头像更新成功')
        return { success: true, message: '头像更新成功' }
      } catch (error) {
        console.error('更新头像失败:', error)
        const errorMsg = '头像更新失败，请稍后重试'
        message.error(errorMsg)
        return { success: false, message: errorMsg }
      }
    }

    return {
      user,
      loginLoading,
      registerLoading,
      getUser,
      setUser,
      clearUser,
      login,
      register,
      updateUserInfo,
      updateAvatar,
    }
  },

  {
    persist: {
      key: 'user-data', // 自定义存储键名
      paths: ['user'], // 仅持久化 user 字段
    },
  },
)
