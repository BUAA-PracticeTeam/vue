<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article'
import { storeToRefs } from 'pinia'

const router = useRouter()
const articleStore = useArticleStore()
const { allArticles, loading } = storeToRefs(articleStore)

// 只加载一次
onMounted(() => {
  if (!allArticles.value.length) {
    articleStore.fetchAllArticles({ pagenum: 1, pagesize: 1000, state: '已发布' })
  }

  // 检测移动端
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }

  checkMobile()
  window.addEventListener('resize', checkMobile)

  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
})

// 刷新按钮
const refresh = () => {
  articleStore.fetchAllArticles({ pagenum: 1, pagesize: 1000, state: '已发布' })
}

const showModal = ref(false)
const currentImage = ref('')
const currentTitle = ref('')
const currentDescription = ref('')
const isMobile = ref(false)

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
          <div class="gallery-item" v-for="n in isMobile ? 4 : 8" :key="n">
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
  /* 移动端优化 */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
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

/* 响应式布局和移动端优化 */
@media (max-width: 1200px) {
  .gallery-container {
    width: 90%;
    gap: 1.2rem;
  }

  .gallery-item {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .gallery-page {
    padding: 1rem 0;
    padding-top: 120px;
  }

  .section-title {
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    margin-top: 2rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
  }

  .refresh-btn {
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  .gallery-container {
    width: 95%;
    padding: 1rem;
    gap: 1rem;
    border-width: 2px;
    border-radius: 12px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .gallery-container:hover {
    box-shadow: 0 6px 32px rgba(41, 137, 216, 0.07);
    border-color: #e0e6f6;
  }

  .gallery-item {
    height: 200px;
    border-radius: 6px;
  }

  .gallery-item:hover img {
    transform: none;
  }

  .gallery-item-overlay {
    opacity: 0.3;
  }

  .gallery-item:hover .gallery-item-overlay {
    opacity: 0.5;
  }

  .gallery-info-bar {
    padding: 8px 12px 4px 12px;
  }

  .gallery-title {
    font-size: 1rem;
  }

  .gallery-meta {
    font-size: 0.85rem;
  }

  .gallery-author,
  .gallery-date {
    font-size: 0.85rem;
  }

  .empty-tip {
    padding: 40px 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-page {
    padding-top: 100px;
  }

  .section-title h2 {
    font-size: 1.3rem;
  }

  .refresh-btn {
    padding: 6px 16px;
    font-size: 0.85rem;
    min-height: 36px;
    min-width: 60px;
  }

  .gallery-container {
    width: 98%;
    padding: 0.8rem;
    gap: 0.8rem;
    border-radius: 8px;
    grid-template-columns: 1fr;
  }

  .gallery-item {
    height: 180px;
  }

  .gallery-info-bar {
    padding: 6px 10px 3px 10px;
  }

  .gallery-title {
    font-size: 0.9rem;
  }

  .gallery-meta {
    font-size: 0.8rem;
  }

  .gallery-author,
  .gallery-date {
    font-size: 0.8rem;
  }

  .empty-tip {
    padding: 30px 0.8rem;
    font-size: 0.9rem;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .gallery-item {
    /* 移动端触摸优化 */
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 200px;
  }

  .gallery-item:hover img {
    transform: none;
  }

  .gallery-item:hover .gallery-item-overlay {
    opacity: 0.3;
  }

  .gallery-container:hover {
    box-shadow: 0 6px 32px rgba(41, 137, 216, 0.07);
    border-color: #e0e6f6;
  }

  /* 增加触摸目标大小 */
  .refresh-btn {
    min-height: 44px;
    min-width: 80px;
    position: absolute;
    right: 0;
    top: 0;
  }

  .close-modal {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* 横屏模式优化 */
@media (orientation: landscape) and (max-height: 600px) {
  .gallery-page {
    padding-top: 80px;
  }

  .gallery-item {
    height: 160px;
  }

  .gallery-info-bar {
    padding: 6px 10px 3px 10px;
  }

  .gallery-title {
    font-size: 0.9rem;
    margin-bottom: 1px;
  }

  .gallery-meta {
    font-size: 0.8rem;
  }

  .gallery-author,
  .gallery-date {
    font-size: 0.8rem;
  }
}

/* 高分辨率屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .gallery-item img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* 减少动画效果（用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .gallery-item img,
  .gallery-item-overlay,
  .gallery-container,
  .refresh-btn {
    transition: none;
  }

  .gallery-item:hover img {
    transform: none;
  }

  .gallery-item:hover .gallery-item-overlay {
    opacity: 0.3;
  }
}

/* 模态框移动端优化 */
@media (max-width: 768px) {
  .modal-content {
    max-width: 95%;
    max-height: 95%;
  }

  .modal-content img {
    max-height: 60vh;
  }

  .modal-caption {
    padding: 0.8rem;
  }

  .modal-caption h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .modal-caption p {
    font-size: 0.9rem;
  }

  .close-modal {
    top: -35px;
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    max-width: 98%;
  }

  .modal-content img {
    max-height: 50vh;
  }

  .modal-caption {
    padding: 0.6rem;
  }

  .modal-caption h3 {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }

  .modal-caption p {
    font-size: 0.85rem;
  }

  .close-modal {
    top: -30px;
    font-size: 1.5rem;
  }
}
</style>
