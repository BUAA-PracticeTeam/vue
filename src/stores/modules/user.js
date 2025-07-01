import { defineStore } from 'pinia'
import { ref } from 'vue'

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
      permission: 0
    })

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
        permission: 0
      }
    }

    return {
      user,
      getUser,
      setUser,
      clearUser
    }
  },
  {
    persist: {
      key: 'user-data', // 自定义存储键名
      paths: ['user']   // 仅持久化 user 字段
    }
  }
)
