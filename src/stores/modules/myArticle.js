import { defineStore } from 'pinia'
import { ref } from 'vue'
import { artGetMyListService } from '@/api/article.js'

export const useMyArticleStore = defineStore('myArticle', () => {
  // 当前用户的所有文章（一次性拉取）
  const allMyArticles = ref([])
  const myArticles = ref([]) // 当前页展示
  const myTotal = ref(0)
  const myLoading = ref(false)

  // 一次性拉取所有当前用户的文章
  const fetchAllMyArticles = async (params = {}) => {
    myLoading.value = true
    try {
      const res = await artGetMyListService(params)
      allMyArticles.value = res.data.data
      myTotal.value = allMyArticles.value.length
      // 默认第一页
      paginateArticles(params.pagenum || 1, params.pagesize || 5)
    } finally {
      myLoading.value = false
    }
  }

  // 前端分页
  const paginateArticles = (page, pageSize) => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    myArticles.value = allMyArticles.value.slice(start, end)
  }

  return {
    allMyArticles,
    myArticles,
    myTotal,
    myLoading,
    fetchAllMyArticles,
    paginateArticles,
  }
})
