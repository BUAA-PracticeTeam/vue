<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { artGetDetailService } from '@/api/article'
import { ElSkeleton, ElIcon } from 'element-plus'
import { View, Pointer } from '@element-plus/icons-vue'

const route = useRoute()
const article = ref(null)
const loading = ref(true)

const fetchArticle = async () => {
  loading.value = true
  try {
    const res = await artGetDetailService(route.params.id)
    article.value = res.data.data
  } catch (error) {
    console.error('Failed to fetch article:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticle()
})
</script>

<template>
  <div class="article-detail-page">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="detail-layout skeleton-layout">
          <aside class="sidebar">
            <el-skeleton-item variant="image" class="cover-image" />
            <el-skeleton-item variant="h1" style="width: 70%; margin-top: 1rem" />
            <div style="display: flex; align-items: center; margin-top: 1rem">
              <el-skeleton-item variant="avatar" style="width: 40px; height: 40px" />
              <div style="margin-left: 10px; width: 100%">
                <el-skeleton-item variant="text" style="width: 40%" />
                <el-skeleton-item variant="text" style="width: 60%; margin-top: 5px" />
              </div>
            </div>
            <el-skeleton-item variant="text" style="margin-top: 1.5rem; width: 50%" />
          </aside>
          <main class="main-content">
            <div class="content-card">
              <el-skeleton-item
                variant="h1"
                style="width: 80%; height: 2.2rem; margin-bottom: 2.5rem"
              />
              <el-skeleton :rows="10" />
            </div>
          </main>
        </div>
      </template>
      <template #default>
        <div v-if="article" class="detail-layout">
          <!-- 左侧边栏 -->
          <aside class="sidebar">
            <div class="sidebar-card">
              <img v-if="article.cover" :src="article.cover" class="cover-image" alt="cover" />
              <div class="info-content">
                <h2 class="sidebar-title">{{ article.title }}</h2>
                <div class="author-bar">
                  <img
                    v-if="article.author && article.author.avatar"
                    :src="article.author.avatar"
                    class="author-avatar"
                    alt="avatar"
                  />
                  <div class="author-info">
                    <div class="author-nickname">
                      {{ article.author?.nickname || '未知作者' }}
                    </div>
                    <div class="pub-date">
                      发布于 {{ article.pub_date ? article.pub_date.slice(0, 10) : '' }}
                    </div>
                  </div>
                </div>
                <div class="stats-bar">
                  <div class="stat-item">
                    <el-icon><View /></el-icon>
                    <span>{{ article.read || 0 }}</span>
                  </div>
                  <div class="stat-item">
                    <el-icon><Pointer /></el-icon>
                    <span>{{ article.like || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <!-- 右侧正文 -->
          <main class="main-content">
            <div class="content-card">
              <h1 class="main-title">{{ article.title }}</h1>
              <div class="main-content-body" v-html="article.content"></div>
            </div>
          </main>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.article-detail-page {
  padding: 120px 20px 40px;
  background: #f9f9f9;
  min-height: 100vh;
}
.detail-layout {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 25px;
  align-items: stretch;
}
.sidebar {
  flex: 0 0 320px;
  position: sticky;
  top: 120px;
}
.sidebar-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.cover-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #eee;
}
.info-content {
  padding: 1.2rem 1.5rem 1.5rem;
}
.sidebar-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  word-break: break-word;
  line-height: 1.4;
  margin-bottom: 1.2rem;
}
.author-bar {
  display: flex;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #f0f0f0;
}
.author-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}
.author-info {
  display: flex;
  flex-direction: column;
}
.author-nickname {
  font-size: 1rem;
  font-weight: bold;
  color: #444;
}
.pub-date {
  font-size: 0.85rem;
  color: #888;
}
.stats-bar {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.2rem;
  color: #555;
}
.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}
.stat-item .el-icon {
  margin-right: 6px;
  font-size: 1.1rem;
  color: #888;
}
.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
}
.content-card {
  background: #fff;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  flex: 1;
}
.main-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}
.main-content-body {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
  word-break: break-word;
  text-align: left !important;
}
/* 强制所有正文内元素左对齐，防止富文本带来的居中 */
.main-content-body * {
  text-align: left !important;
}
:deep(.main-content-body p) {
  text-indent: 2em !important;
  text-align: left !important;
}
:deep(.main-content-body img) {
  display: block;
  margin: 1.2em auto;
  max-width: 100%;
  height: auto;
}

.skeleton-layout .sidebar,
.skeleton-layout .main-content {
  transform: translateY(0);
}
@media (max-width: 992px) {
  .detail-layout {
    flex-direction: column;
  }
  .sidebar {
    position: static;
    width: 100%;
    flex: auto;
  }
}
@media (max-width: 768px) {
  .article-detail-page {
    padding: 100px 15px 20px;
  }
  .content-card {
    padding: 1.5rem;
  }
  .sidebar-title,
  .main-title {
    font-size: 1.6rem;
  }
}
</style>
