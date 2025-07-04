import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  artGetListService,
  artGetDetailService,
  artPublishService,
  artEditService,
  artDelService,
} from '@/api/article.js'
import { ElMessage } from 'element-plus'

export const useArticleStore = defineStore('article', () => {
  // 全部文章（分页/精彩回顾/全局）
  const allArticles = ref([])
  const total = ref(0)
  const loading = ref(false)
  const currentArticle = ref(null)

  // 获取全部文章（可分页/可筛选）
  const fetchAllArticles = async (params = {}) => {
    loading.value = true
    try {
      const res = await artGetListService(params)
      allArticles.value = res.data.data
      total.value = res.data.total
    } finally {
      loading.value = false
    }
  }

  // 获取单篇文章详情
  const fetchArticleDetail = async (id) => {
    const res = await artGetDetailService(id)
    currentArticle.value = res.data.data
    return currentArticle.value
  }

  // 发布新文章
  const publishArticle = async (formData) => {
    await artPublishService(formData)
    ElMessage.success('发布成功')
  }

  // 编辑文章
  const editArticle = async (formData) => {
    await artEditService(formData)
    ElMessage.success('编辑成功')
  }

  // 删除文章
  const deleteArticle = async (id) => {
    await artDelService(id)
    ElMessage.success('删除成功')
  }

  return {
    allArticles,
    total,
    loading,
    currentArticle,
    fetchAllArticles,
    fetchArticleDetail,
    publishArticle,
    editArticle,
    deleteArticle,
  }
})
