<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="heritage-menu-container">
    <div class="header-section">
      <h1>非遗长廊</h1>
      <p class="subtitle">探寻乡土文化，感受指尖非遗</p>
    </div>

    <div class="cards-wrapper">
      <div class="heritage-card" @click="navigateTo('/heritage/tie-dye')">
        <div class="card-image">
          <img src="/src/assets/img/heritage/tie-dye/hero.jpg" alt="扎染" />
        </div>
        <div class="card-info">
          <h2>巍山扎染</h2>
          <p>被誉为“布上的青花瓷”，千年草木染心。手工扎结晕染出无法复制的自然“冰裂纹”，将苍山洱海的蓝白风情，凝固成永恒的东方雅韵。</p>
          <span class="btn-explore">点击探索 &rarr;</span>
        </div>
      </div>

      <div class="heritage-card" @click="navigateTo('/heritage/paper-cut')">
        <div class="card-image">
          <img src="/src/assets/img/heritage/paper-cut/hero.jpg" alt="剪纸" />
        </div>
        <div class="card-info">
          <h2>苗族剪纸</h2>
          <p>苗族文化的活化石，以独有的锯齿纹与细腻线条，刻画万物有灵的巫傩奇境。一剪一刻，皆是先民对自然与生命的极致礼赞。</p>
          <span class="btn-explore">点击探索 &rarr;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heritage-menu-container {
  padding-top: 80px;
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-section {
  text-align: center;
  margin: 40px 0;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.cards-wrapper {
  display: flex;
  gap: 40px;
  padding: 0 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.heritage-card {
  background: white;
  width: 350px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.heritage-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.card-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.card-info {
  padding: 25px;
}

.card-info h2 {
  margin-bottom: 10px;
  color: #333;
}

.card-info p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.btn-explore {
  color: #297ef2;
  font-weight: bold;
  font-size: 0.9rem;
}
</style>
