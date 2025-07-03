<template>
  <transition name="fade">
    <div v-if="visible" class="detail-overlay" @click.self="close">
      <div class="detail-card">
        <div class="close-btn" @click="close">×</div>
        <div class="photo-row">
          <img :src="member.photo" alt="个人照片" class="photo" />
          <img :src="member.avatar" alt="头像" class="avatar" />
        </div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">用户名：</span>
            <span>{{ member.username }}</span>
          </div>
          <div class="info-item">
            <span class="label">权限：</span>
            <span>{{ member.permission }}</span>
          </div>
          <div class="info-item">
            <span class="label">昵称：</span>
            <span>{{ member.nickname }}</span>
          </div>
          <div class="info-item">
            <span class="label">签名：</span>
            <span>{{ member.signature || '暂无签名' }}</span>
          </div>
          <div class="info-item">
            <span class="label">个人介绍：</span>
            <span>{{ member.introduction || '暂无介绍' }}</span>
          </div>
          <div class="info-item">
            <span class="label">邮箱：</span>
            <span>{{ member.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">职责：</span>
            <span>{{ member.work || '团队成员' }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  member: Object,
})
const emit = defineEmits(['close'])
function close() {
  emit('close')
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
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 32px 32px 24px 32px;
  min-width: 340px;
  max-width: 95vw;
  position: relative;
  animation: popin 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
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
  right: 18px;
  top: 12px;
  font-size: 1.8rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #e74c3c;
}
.photo-row {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}
.photo {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  border: 3px solid #f0f0f0;
  background: #fafbfc;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
  background: #fafbfc;
}
.info-list {
  margin-top: 10px;
}
.info-item {
  display: flex;
  margin-bottom: 10px;
  font-size: 1.08rem;
}
.label {
  color: #888;
  min-width: 80px;
  font-weight: 500;
}
</style>
