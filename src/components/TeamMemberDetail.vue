<template>
  <transition name="fade">
    <div v-if="visible" class="detail-overlay" @click.self="close">
      <div class="detail-card">
        <div class="close-btn" @click="close">×</div>
        <div class="card-content">
          <div class="photo-col">
            <div class="photo-box">
              <img
                :src="member.photo || defaultAvatar"
                alt="个人照片"
                class="photo"
                @error="handlePhotoError"
              />
            </div>
          </div>
          <div class="info-col">
            <div class="header-row">
              <img
                :src="member.avatar || defaultAvatar"
                alt="头像"
                class="avatar"
                @error="handleAvatarError"
              />
              <h2 class="nickname">{{ member.nickname || member.username }}</h2>
            </div>
            <p class="work">{{ member.work || '团队成员' }}</p>
            <el-descriptions :column="1" border class="info-table">
              <el-descriptions-item label="用户名">{{ member.username }}</el-descriptions-item>
              <el-descriptions-item label="权限">{{
                member.permission || '不告诉你'
              }}</el-descriptions-item>
              <el-descriptions-item label="签名">{{
                member.signature || '暂无签名'
              }}</el-descriptions-item>
              <el-descriptions-item label="个人介绍">{{
                member.introduction || '暂无介绍'
              }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{
                member.email || '暂无邮箱'
              }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import defaultAvatar from '../assets/img/default-avatar.svg'
defineProps({
  visible: Boolean,
  member: Object,
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}

// 处理照片加载错误
const handlePhotoError = (event) => {
  event.target.src = defaultAvatar
}

// 处理头像加载错误
const handleAvatarError = (event) => {
  event.target.src = defaultAvatar
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.detail-overlay {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
  padding: 0;
  min-width: 700px;
  max-width: 900px;
  width: 80vw;
  position: relative;
  animation: popin 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  overflow: hidden;
}
@keyframes popin {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.close-btn {
  position: absolute;
  right: 24px;
  top: 18px;
  font-size: 2.2rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 2;
}
.close-btn:hover {
  color: #e74c3c;
}
.card-content {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 340px;
}
.photo-col {
  background: linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 340px;
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
}
.photo-box {
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
.photo {
  width: 220px;
  height: 220px;
  border-radius: 18px;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: #fafbfc;
}

.photo[src*='default-avatar'] {
  object-fit: contain;
  padding: 30px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fafbfc;
  margin-right: 18px;
}

.avatar[src*='default-avatar'] {
  object-fit: contain;
  padding: 8px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.nickname {
  font-size: 2.1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}
.work {
  font-size: 1.15rem;
  color: #6a82fb;
  margin-bottom: 18px;
  font-weight: 500;
  margin-top: 0;
}
.info-col {
  flex: 1;
  padding: 40px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-table {
  margin-top: 10px;
  --el-descriptions-border-color: #f0f0f0;
  --el-descriptions-label-bg-color: #f7f7fa;
  --el-descriptions-content-bg-color: #fff;
  --el-descriptions-label-color: #6a82fb;
  --el-descriptions-content-color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
@media (max-width: 900px) {
  .detail-card {
    min-width: 0;
    width: 98vw;
    max-width: 98vw;
  }
  .card-content {
    flex-direction: column;
    min-height: 0;
  }
  .photo-col {
    min-width: 100%;
    max-width: 100%;
    justify-content: center;
    padding: 24px 0 0 0;
  }
  .info-col {
    padding: 28px 16px 24px 16px;
  }
  .photo-box {
    width: 160px;
    height: 160px;
  }
  .photo {
    width: 160px;
    height: 160px;
  }

  .photo[src*='default-avatar'] {
    padding: 20px;
  }
  .header-row {
    margin-bottom: 6px;
    justify-content: center;
  }
  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }

  .avatar[src*='default-avatar'] {
    padding: 6px;
  }
}
</style>
