<script setup>
import { ref, computed } from 'vue'
import { Plus, Upload, Picture } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user.js'
import PageContainer from '@/components/PageContainer.vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

// 使用计算属性从 store 获取用户信息
const user = computed(() => userStore.getUser())

// 头像相关
const avatarUrl = ref(user.value.avatar || '')
const avatarUploadRef = ref()
const avatarLoading = ref(false)

// 个人照片相关
const photoUrl = ref(user.value.photo || '')
const photoUploadRef = ref()
const photoLoading = ref(false)

// 头像文件选择处理
const onSelectAvatarFile = (uploadFile) => {
  // 检查文件大小（10MB = 10 * 1024 * 1024 bytes）
  const maxSize = 10 * 1024 * 1024
  if (uploadFile.raw.size > maxSize) {
    ElMessage.error('文件大小不能超过10MB')
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    avatarUrl.value = reader.result
  }
}

// 个人照片文件选择处理
const onSelectPhotoFile = (uploadFile) => {
  // 检查文件大小（10MB = 10 * 1024 * 1024 bytes）
  const maxSize = 10 * 1024 * 1024
  if (uploadFile.raw.size > maxSize) {
    ElMessage.error('文件大小不能超过10MB')
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    photoUrl.value = reader.result
  }
}

// 更新头像
const onUpdateAvatar = async () => {
  if (!avatarUrl.value) {
    ElMessage.warning('请先选择头像图片')
    return
  }

  avatarLoading.value = true
  ElMessage.info('正在更新头像，请稍候...')

  try {
    const result = await userStore.updateAvatar(avatarUrl.value)
    if (result.success) {
      ElMessage.success('头像更新成功')
    }
  } finally {
    avatarLoading.value = false
  }
}

// 更新个人照片
const onUpdatePhoto = async () => {
  if (!photoUrl.value) {
    ElMessage.warning('请先选择个人照片')
    return
  }

  photoLoading.value = true
  ElMessage.info('正在更新个人照片，请稍候...')

  try {
    const result = await userStore.updatePhoto(photoUrl.value)
    if (result.success) {
      ElMessage.success('个人照片更新成功')
    }
  } finally {
    photoLoading.value = false
  }
}
</script>

<template>
  <page-container title="照片管理">
    <div class="photo-management">
      <div class="upload-container">
        <!-- 头像上传区域 -->
        <div class="upload-section">
          <h3 class="section-title">
            <el-icon><Picture /></el-icon>
            头像管理
          </h3>
          <div class="upload-content">
            <el-upload
              ref="avatarUploadRef"
              :auto-upload="false"
              class="avatar-uploader"
              :show-file-list="false"
              :on-change="onSelectAvatarFile"
            >
              <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
              <img v-else-if="user.avatar" :src="user.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>

            <div class="file-info">
              <span class="file-size-limit">支持格式：JPG、PNG、GIF</span>
              <span class="file-size-limit">文件大小：不超过10MB</span>
            </div>

            <div class="upload-actions">
              <el-button
                @click="onUpdateAvatar"
                type="success"
                :icon="Upload"
                size="large"
                :loading="avatarLoading"
              >
                更新头像
              </el-button>
            </div>
          </div>
        </div>

        <!-- 个人照片上传区域 -->
        <div class="upload-section">
          <h3 class="section-title">
            <el-icon><Picture /></el-icon>
            个人照片管理
          </h3>
          <div class="upload-content">
            <el-upload
              ref="photoUploadRef"
              :auto-upload="false"
              class="photo-uploader"
              :show-file-list="false"
              :on-change="onSelectPhotoFile"
            >
              <img v-if="photoUrl" :src="photoUrl" class="photo" />
              <img v-else-if="user.photo" :src="user.photo" class="photo" />
              <el-icon v-else class="photo-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>

            <div class="file-info">
              <span class="file-size-limit">支持格式：JPG、PNG、GIF</span>
              <span class="file-size-limit">文件大小：不超过10MB</span>
            </div>

            <div class="upload-actions">
              <el-button
                @click="onUpdatePhoto"
                type="success"
                :icon="Upload"
                size="large"
                :loading="photoLoading"
              >
                更新照片
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-container>
</template>

<style lang="scss" scoped>
.photo-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.upload-container {
  display: flex;
  gap: 30px;
  justify-content: center;
}

.upload-section {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 500px;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}

.section-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin: 0;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;

  .el-icon {
    font-size: 20px;
  }
}

.upload-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: -10px;
}

.file-size-limit {
  font-size: 12px;
  color: #8c8c8c;
  text-align: center;
}

.upload-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.avatar-uploader,
.photo-uploader {
  :deep() {
    .avatar {
      width: 200px;
      height: 200px;
      display: block;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .photo {
      width: 200px;
      height: 200px;
      display: block;
      border-radius: 12px;
      object-fit: cover;
      border: 4px solid #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .el-upload {
      border: 2px dashed #e1e5e9;
      border-radius: 12px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      background: #fafbfc;

      &:hover {
        border-color: #667eea;
        background: #f0f4ff;
        transform: scale(1.02);
      }
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c8c8c;
      width: 200px;
      height: 200px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 50%;
    }

    .photo-uploader-icon {
      font-size: 28px;
      color: #8c8c8c;
      width: 200px;
      height: 200px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 12px;
    }

    .avatar-uploader-icon:hover,
    .photo-uploader-icon:hover {
      background: #e6f7ff;
      color: #1890ff;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .photo-management {
    padding: 10px;
  }

  .upload-container {
    flex-direction: column;
    gap: 20px;
  }

  .upload-section {
    max-width: none;
  }

  .upload-content {
    padding: 20px;
  }

  .avatar-uploader :deep() .avatar {
    width: 150px;
    height: 150px;
  }

  .photo-uploader :deep() .photo {
    width: 150px;
    height: 150px;
  }

  .avatar-uploader :deep() .avatar-uploader-icon {
    width: 150px;
    height: 150px;
  }

  .photo-uploader :deep() .photo-uploader-icon {
    width: 150px;
    height: 150px;
  }

  .upload-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
