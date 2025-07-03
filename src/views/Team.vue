<script setup>
import { onMounted, computed } from 'vue'
import { useTeamStore } from '@/stores/modules/team.js'
import { defineOptions } from 'vue'

defineOptions({
  name: 'TeamPage',
})

const teamStore = useTeamStore()

// 使用计算属性获取团队成员数据
const teamMembers = computed(() => teamStore.teamMembers)
const loading = computed(() => teamStore.loading)

// 组件挂载时获取团队成员数据
onMounted(async () => {
  // 每次都从服务器获取最新数据
  await teamStore.getTeamMembers()
})
</script>

<template>
  <div class="team-page">
    <div class="container">
      <div class="section-title">
        <h2>队员介绍</h2>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-loading-spinner />
        <p>正在加载团队成员信息...</p>
      </div>

      <!-- 团队成员列表 -->
      <div v-else-if="teamMembers.length > 0" class="team-members">
        <div class="member-card" v-for="member in teamMembers" :key="member.id">
          <div class="member-image">
            <img :src="member.photo" :alt="member.nickname || member.username" />
          </div>
          <div class="member-info">
            <h3>{{ member.nickname || member.username }}</h3>
            <p class="position">{{ member.work || '团队成员' }}</p>
            <p>{{ member.signature || '暂无签名' }}</p>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无团队成员信息" />
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: #666;
}

.loading-container p {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.empty-state {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}
</style>
