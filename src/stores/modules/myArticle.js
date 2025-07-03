import { defineStore } from 'pinia'
import { ref } from 'vue'
import { artGetListService } from '@/api/article.js'

export const useMyArticleStore = defineStore('myArticle', () => {
  // 当前用户的文章
  const myArticles = ref([])
  const myTotal = ref(0)
  const myLoading = ref(false)

  // 获取当前用户的文章（可分页/可筛选）
  const fetchMyArticles = async (params = {}) => {
    myLoading.value = true
    try {
      // 假设后端会根据token/session自动识别当前用户
      const res = await artGetListService(params)
      myArticles.value = res.data.data
      myTotal.value = res.data.total
    } finally {
      myLoading.value = false
    }
  }

  return {
    myArticles,
    myTotal,
    myLoading,
    fetchMyArticles,
  }
})
