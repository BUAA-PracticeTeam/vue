<script setup>
import { ref } from 'vue'
import { defineOptions } from 'vue'

defineOptions({
  name: 'TeamPage', // 直接设置组件名称
})

// 使用 ref 定义响应式数据
const teamMembers = ref([
  {
    id: 1,
    name: '李堂玮',
    position: '队长',
    bio: '负责团队整体规划和协调工作，有丰富的实践经验。',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: '陈翰林',
    position: '副队长',
    bio: '协助队长工作，主要负责活动策划和执行。',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: '王芳',
    position: '宣传组长',
    bio: '负责团队活动的宣传和报道工作。',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: 4,
    name: '赵强',
    position: '后勤组长',
    bio: '负责活动物资准备和后勤保障工作。',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
])
</script>

<template>
  <div class="team-page">
    <div class="container">
      <div class="section-title">
        <h2>队员介绍</h2>
      </div>
      <div class="team-members">
        <div class="member-card" v-for="member in teamMembers" :key="member.id">
          <div class="member-image">
            <img :src="member.image" :alt="member.name" />
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <p class="position">{{ member.position }}</p>
            <p>{{ member.bio }}</p>
            <div class="social-links">
              <a href="#"><i class="fa fa-weibo"></i></a>
              <a href="#"><i class="fa fa-weixin"></i></a>
              <a href="#"><i class="fa fa-qq"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-page {
  padding: 2rem 0;
  padding-top: 100px;
}

.team-members {
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
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

.member-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-align: center;
}

.member-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.member-image {
  height: 250px;
  overflow: hidden;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.member-card:hover .member-image img {
  transform: scale(1.1);
}

.member-info {
  padding: 1.5rem;
}

.member-info h3 {
  margin-bottom: 0.5rem;
  color: #2989d8;
}

.member-info p.position {
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links a {
  color: #666;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #2989d8;
}
</style>
