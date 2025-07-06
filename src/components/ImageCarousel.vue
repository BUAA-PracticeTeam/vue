<template>
  <div class="image-carousel-container">
    <div class="carousel-box">
      <ul class="carousel-list">
        <li v-for="(image, index) in displayImages" :key="index">
          <img :src="image" :alt="`展示图片 ${index + 1}`" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ImageCarousel',
  setup() {
    // 精选的5张高质量图片
    const images = [
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ]

    // 为了无缝循环，需要重复图片
    const displayImages = computed(() => {
      return [...images, ...images]
    })

    return {
      displayImages,
    }
  },
})
</script>

<style scoped>
.image-carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 0 2rem;
}

.carousel-box {
  width: 100%;
  height: 200px;
  border: 3px solid #2989d8;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: 0 8px 32px rgba(41, 137, 216, 0.15);
}

.carousel-list {
  display: flex;
  animation: move 12s infinite linear;
  margin: 0;
  padding: 0;
  list-style: none;
}

.carousel-list li {
  flex-shrink: 0;
  margin: 0;
  padding: 0;
}

.carousel-list img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  display: block;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.carousel-list img:hover {
  transform: scale(1.05);
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1000px); /* 5张图片的宽度 */
  }
}

.carousel-box:hover .carousel-list {
  animation-play-state: paused;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .carousel-box {
    width: 100%;
    height: 150px;
  }

  .carousel-list img {
    width: 150px;
    height: 150px;
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-750px); /* 5张图片的宽度 */
    }
  }
}

@media (max-width: 600px) {
  .carousel-box {
    width: 100%;
    height: 120px;
  }

  .carousel-list img {
    width: 120px;
    height: 120px;
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-600px); /* 5张图片的宽度 */
    }
  }
}
</style>
