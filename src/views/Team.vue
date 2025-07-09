<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import TeamMemberDetail from '@/components/TeamMemberDetail.vue'
import defaultAvatar from '../assets/img/default-avatar.svg'

// 组件名
defineOptions({
  name: 'TeamPage',
})

const teamStore = useTeamStore()
const teamMembers = computed(() => teamStore.teamMembers)
const loading = computed(() => teamStore.loading)

const detailVisible = ref(false)
const selectedMember = ref(null)
const isMobile = ref(false)

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
const refresh = async () => {
  await teamStore.getTeamMembers()
}

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = defaultAvatar
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

      <!-- 加载骨架屏：响应式数量的骨架卡片 -->
      <div v-if="loading" class="team-members">
        <div class="member-card" v-for="n in isMobile ? 4 : 8" :key="n">
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
              :src="member.photo || defaultAvatar"
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  /* 移动端触摸优化 */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
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

/* 响应式布局和移动端优化 */
@media (max-width: 1200px) {
  .team-members {
    width: 85%;
    gap: 1.5rem;
  }

  .member-image {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .team-page {
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
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  .team-members {
    width: 95%;
    padding: 1rem;
    gap: 1rem;
    border-width: 2px;
    border-radius: 12px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .team-members:hover {
    box-shadow: 0 6px 32px rgba(41, 137, 216, 0.07);
    border-color: #e0e6f6;
  }

  .member-card {
    border-radius: 6px;
  }

  .member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .member-image {
    height: 180px;
  }

  .member-info {
    padding: 1rem;
  }

  .member-info h3 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }

  .member-info p {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .member-info p.position {
    margin-bottom: 0.8rem;
  }

  .empty-state {
    padding: 40px 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .team-page {
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

  .team-members {
    width: 98%;
    padding: 0.8rem;
    gap: 0.8rem;
    border-radius: 8px;
    grid-template-columns: 1fr;
  }

  .member-image {
    height: 160px;
  }

  .member-info {
    padding: 0.8rem;
  }

  .member-info h3 {
    font-size: 1rem;
  }

  .member-info p {
    font-size: 0.85rem;
  }

  .empty-state {
    padding: 30px 0.8rem;
    font-size: 0.9rem;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .member-card:hover {
    transform: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .member-card:hover .member-image img {
    transform: none;
  }

  .team-members:hover {
    box-shadow: 0 6px 32px rgba(41, 137, 216, 0.07);
    border-color: #e0e6f6;
  }

  /* 增加触摸目标大小 */
  .member-card {
    min-height: 300px;
  }

  .refresh-btn {
    min-height: 44px;
    min-width: 80px;
    position: absolute;
    right: 0;
    top: 0;
  }
}

/* 横屏模式优化 */
@media (orientation: landscape) and (max-height: 600px) {
  .team-page {
    padding-top: 80px;
  }

  .member-image {
    height: 140px;
  }

  .member-info {
    padding: 0.6rem;
  }

  .member-info h3 {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  .member-info p {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
}

/* 高分辨率屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .member-image img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* 减少动画效果（用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .member-card,
  .member-image img,
  .team-members,
  .refresh-btn {
    transition: none;
  }

  .member-card:hover {
    transform: none;
  }

  .member-card:hover .member-image img {
    transform: none;
  }
}
</style>
