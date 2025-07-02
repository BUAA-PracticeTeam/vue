<script setup>
import { ref, computed } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user.js'
import PageContainer from '@/components/PageContainer.vue'

const userStore = useUserStore()

// 使用计算属性从 store 获取用户信息
const user = computed(() => userStore.getUser())
const imgUrl = ref(user.value.avatar || '') // ✅ 初始化为当前头像（如果存在）
const uploadRef = ref()
const onSelectFile = (uploadFile) => {
  // 基于 FileReader 读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}

const onUpdateAvatar = async () => {
  // 调用 store 中的更新头像方法
  const result = await userStore.updateAvatar(imgUrl.value)

  if (result.success) {
    // 更新成功后的处理逻辑可以在这里添加
    console.log('头像更新成功')
  }
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <!--      <img v-if="imgUrl" :src="imgUrl" class="avatar" />-->
      <!--      <el-icon v-else class="avatar-uploader-icon">-->
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <img v-else-if="user.avatar" :src="user.avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>

    <br />

    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="large"
      >选择图片
    </el-button>
    <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size="large"
      >上传头像
    </el-button>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #fcfcfe;
      width: 278px;
      height: 278px;
      text-align: center;
      background-color: #e7e8ea;
    }

    .el-icon.avatar-uploader-icon:hover {
      background-color: #b7b8b7;
    }
  }
}
</style>
