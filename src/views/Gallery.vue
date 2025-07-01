<script setup>
import { ref } from 'vue'
import { defineOptions } from 'vue'

const galleryItems = ref([
  {
    title: '乡村支教活动',
    description: '2022年暑期在贵州省某小学开展的为期两周的支教活动。',
    image:
      'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: '环保宣传活动',
    description: '在城市公园开展的垃圾分类和环保知识宣传活动。',
    image:
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: '社区志愿服务',
    description: '为社区老人提供生活帮助和精神关怀的志愿服务活动。',
    image:
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: '团队建设活动',
    description: '团队内部的团建活动，增进队员之间的了解和默契。',
    image:
      'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: '山区调研',
    description: '对偏远山区教育状况进行的实地调研活动。',
    image:
      'https://images.unsplash.com/photo-1527909740628-f2a110ce1f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: '公益讲座',
    description: '邀请专家为社区居民举办公益讲座。',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
])

const showModal = ref(false)
const currentImage = ref('')
const currentTitle = ref('')
const currentDescription = ref('')

const showGalleryModal = (index) => {
  const item = galleryItems.value[index]
  currentImage.value = item.image
  currentTitle.value = item.title
  currentDescription.value = item.description
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

// 设置组件名称（Vue 3.3+）
defineOptions({
  name: 'GalleryPage',
})
</script>

<template>
  <div class="gallery-page">
    <div class="container">
      <div class="section-title">
        <h2>精彩回顾</h2>
      </div>
      <div class="gallery-container">
        <div
          class="gallery-item"
          v-for="(item, index) in galleryItems"
          :key="index"
          @click="showGalleryModal(index)"
        >
          <img :src="item.image" :alt="item.title" />
          <div class="gallery-item-overlay">
            <i class="fa fa-search-plus"></i>
          </div>
        </div>
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

.gallery-container {
  margin: 0 auto;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
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
</style>
