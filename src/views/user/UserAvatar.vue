<script setup>
import {ref} from 'vue'
import {Plus, Upload} from '@element-plus/icons-vue'
import {useUserStore} from '@/stores/modules/user.js'
import PageContainer from '@/components/PageContainer.vue'

import {userUpdateAvatarService} from '@/api/user'
import {ElMessage} from 'element-plus'

const userStore = useUserStore()
const user = userStore.getUser() // 获取完整用户对象
// const imgUrl = ref('')
const imgUrl = ref(user.avatar || '') // ✅ 初始化为当前头像（如果存在）
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
  // 发送请求更新头像
  console.log('发送请求')
  await userUpdateAvatarService(imgUrl.value, user.username)
  userStore.setUser({avatar: imgUrl.value})
  // 提示用户
  ElMessage.success('头像更新成功')
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
      <img v-if="imgUrl" :src="imgUrl" class="avatar"/>
      <img v-else-if="user.avatar" :src="user.avatar" class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>

    <br/>

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
