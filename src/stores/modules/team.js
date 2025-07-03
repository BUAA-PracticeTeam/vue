import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTeamMembersService } from '@/api/team.js'
import { ElMessage } from 'element-plus'

export const useTeamStore = defineStore('team', () => {
  // 团队成员列表
  const teamMembers = ref([])

  // 加载状态
  const loading = ref(false)

  // 获取所有团队成员
  const getTeamMembers = async () => {
    loading.value = true
    try {
      const response = await getTeamMembersService()

      if (response.data.error_num) {
        ElMessage.error(response.data.msg || '获取团队成员失败')
        return { success: false, message: response.data.msg }
      }

      teamMembers.value = response.data.members || []
      return { success: true, data: teamMembers.value }
    } catch (error) {
      console.error('获取团队成员失败:', error)
      const errorMsg = '获取团队成员失败，请稍后重试'
      ElMessage.error(errorMsg)
      return { success: false, message: errorMsg }
    } finally {
      loading.value = false
    }
  }

  return {
    teamMembers,
    loading,
    getTeamMembers,
  }
})
