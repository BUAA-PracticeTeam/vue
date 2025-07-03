<script setup>
import { ref, onMounted } from 'vue'
import { defineOptions } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/modules/article'
import { storeToRefs } from 'pinia'

const router = useRouter()
const articleStore = useArticleStore()
const { allArticles, loading } = storeToRefs(articleStore)

// 只加载一次
onMounted(() => {
  if (!allArticles.value.length) {
    articleStore.fetchAllArticles({ pagenum: 1, pagesize: 1000, state: '已发布' })
  }
})

// 刷新按钮
const refresh = () => {
  articleStore.fetchAllArticles({ pagenum: 1, pagesize: 1000, state: '已发布' })
}

const showModal = ref(false)
const currentImage = ref('')
const currentTitle = ref('')
const currentDescription = ref('')

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

defineOptions({
  name: 'GalleryPage',
})
</script>

<template>
  <div class="gallery-page">
    <div class="container">
      <div class="section-title">
        <h2>精彩回顾</h2>
        <button class="refresh-btn" @click="refresh" :disabled="loading">
          {{ loading ? '刷新中...' : '刷新' }}
        </button>
      </div>
      <div class="gallery-container">
        <template v-if="loading">
          <div class="gallery-item" v-for="n in 8" :key="n">
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 100%; border-radius: 8px"
            />
            <div class="gallery-info-bar">
              <el-skeleton-item
                variant="text"
                style="width: 60%; height: 1.2em; margin-bottom: 4px"
              />
              <el-skeleton-item variant="text" style="width: 40%; height: 1em" />
            </div>
          </div>
        </template>
        <template v-else>
          <template v-if="allArticles.length">
            <div
              class="gallery-item"
              v-for="item in allArticles.filter((a) => a.state === '已发布')"
              :key="item.id"
              @click="goToArticle(item.id)"
            >
              <template v-if="item.cover">
                <img :src="item.cover" :alt="item.title" />
              </template>
              <template v-else>
                <div class="gallery-item-placeholder">
                  <i class="fa fa-image"></i>
                </div>
              </template>
              <div class="gallery-info-bar">
                <div class="gallery-title">{{ item.title }}</div>
                <div class="gallery-meta">
                  <span class="gallery-author">{{ item.author?.nickname || '未知作者' }}</span>
                  <span class="gallery-date">{{
                    item.pub_date ? item.pub_date.slice(0, 10) : ''
                  }}</span>
                </div>
              </div>
              <div class="gallery-item-overlay">
                <i class="fa fa-search-plus"></i>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="empty-tip">暂无已发布文章</div>
          </template>
        </template>
      </div>
    </div>

    <!-- 图片查看模态框 -->
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">&times;</button>
        <img :src="currentImage" :alt="currentTitle" />
        <div class="modal-caption">
          <h3>{{ currentTitle }}</h3>
          <p>{{ currentDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-page {
  padding: 2rem 0;
  padding-top: 100px;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.section-title h2 {
  font-size: 2rem;
  color: #2989d8;
  display: inline-block;
  padding-bottom: 10px;
}

.section-title h2:after {
  content: '';
  position: absolute;
  width: 80px;
  height: 3px;
  background: #ffcc00;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.refresh-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0 10px;
  padding: 6px 18px;
  background: #2989d8;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.refresh-btn:disabled {
  background: #b0b0b0;
  cursor: not-allowed;
}

.gallery-container {
  margin: 0 auto;
  width: 80%;
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  border: 2.5px solid #e0e6f6;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(41, 137, 216, 0.07);
  background: rgba(255, 255, 255, 0.96);
  box-sizing: border-box;
  transition:
    box-shadow 0.3s,
    border-color 0.3s;
}
.gallery-container:hover {
  box-shadow: 0 12px 40px rgba(41, 137, 216, 0.13);
  border-color: #b3d4fc;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 250px;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item-overlay i {
  color: white;
  font-size: 2rem;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  border-radius: 8px;
}

.modal-caption {
  background: white;
  padding: 1rem;
  border-radius: 0 0 8px 8px;
  text-align: center;
}

.close-modal {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.gallery-item-placeholder {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #b0b0b0;
}

.gallery-info-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.56);
  color: #fff;
  padding: 10px 16px 6px 16px;
  box-sizing: border-box;
  z-index: 2;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.gallery-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 2px;
  text-shadow: 0 2px 8px #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gallery-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
  opacity: 0.85;
}

.gallery-author {
  margin-right: 10px;
}

.gallery-date {
  font-size: 0.92rem;
}

.empty-tip {
  width: 100%;
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  padding: 60px 0;
}
</style>
