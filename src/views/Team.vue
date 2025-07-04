<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTeamStore } from '@/stores/modules/team.js'
import TeamMemberDetail from '@/components/TeamMemberDetail.vue'
import { defineOptions } from 'vue'

// 组件名
defineOptions({
  name: 'TeamPage',
})

const teamStore = useTeamStore()
const teamMembers = computed(() => teamStore.teamMembers)
const loading = computed(() => teamStore.loading)

const detailVisible = ref(false)
const selectedMember = ref(null)

function showMemberDetail(member) {
  selectedMember.value = member
  detailVisible.value = true
}
function closeDetail() {
  detailVisible.value = false
  selectedMember.value = null
}

// 只加载一次
onMounted(async () => {
  if (!teamMembers.value.length) {
    await teamStore.getTeamMembers()
  }
})

// 刷新按钮
const refresh = async () => {
  await teamStore.getTeamMembers()
}

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = '/src/assets/img/default-avatar.svg'
}
</script>

<template>
  <div class="team-page">
    <div class="container">
      <div class="section-title">
        <h2>队员介绍</h2>
        <button class="refresh-btn" @click="refresh" :disabled="loading">
          {{ loading ? '刷新中...' : '刷新' }}
        </button>
      </div>

      <!-- 加载骨架屏：8个和真实卡片一样大小的骨架卡片 -->
      <div v-if="loading" class="team-members">
        <div class="member-card" v-for="n in 8" :key="n">
          <div class="member-image">
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 100%; border-radius: 8px"
            />
          </div>
          <div class="member-info">
            <el-skeleton-item variant="h3" style="width: 60%; height: 1.5em; margin-bottom: 8px" />
            <el-skeleton-item variant="text" style="width: 40%; height: 1em; margin-bottom: 8px" />
            <el-skeleton-item variant="text" style="width: 80%; height: 1em" />
          </div>
        </div>
      </div>

      <!-- 团队成员列表 -->
      <div v-else-if="teamMembers.length > 0" class="team-members">
        <div
          class="member-card"
          v-for="member in teamMembers"
          :key="member.id"
          @click="showMemberDetail(member)"
          style="cursor: pointer"
        >
          <div class="member-image">
            <img
              :src="member.photo || '/src/assets/img/default-avatar.svg'"
              :alt="member.nickname || member.username"
              @error="handleImageError"
            />
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
    <TeamMemberDetail :visible="detailVisible" :member="selectedMember" @close="closeDetail" />
  </div>
</template>

<style scoped>
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

.team-page {
  padding: 2rem 0;
  padding-top: 100px;
}

.team-members {
  width: 70%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  border: 2.5px solid #e0e6f6;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(41, 137, 216, 0.07);
  background: rgba(255, 255, 255, 0.96);
  box-sizing: border-box;
  transition:
    box-shadow 0.3s,
    border-color 0.3s;
}
.team-members:hover {
  box-shadow: 0 12px 40px rgba(41, 137, 216, 0.13);
  border-color: #b3d4fc;
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
  background-color: #f5f5f5;
}

.member-image img[src*='default-avatar'] {
  object-fit: contain;
  padding: 20px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
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

.empty-state {
  width: 100%;
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  padding: 60px 0;
}
</style>
