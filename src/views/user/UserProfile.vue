<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/modules/user.js'

const formRef = ref()
const userStore = useUserStore()

// 使用计算属性从 store 获取用户信息
const user = computed(() => userStore.getUser())
const username = computed(() => user.value.username)
const nickname = computed(() => user.value.nickname)
const email = computed(() => user.value.email)

// 创建响应式的表单数据
const form = ref({
  username: '',
  nickname: '',
  email: '',
})

// 监听用户信息变化，更新表单数据
const updateFormFromStore = () => {
  form.value = {
    username: username.value,
    nickname: nickname.value,
    email: email.value,
  }
}

// 初始化表单数据
updateFormFromStore()

const rules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}/,
      message: '昵称长度在2-10个非空字符',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change'],
    },
  ],
})

const submitForm = async () => {
  // 等待校验结果
  await formRef.value.validate()
  // 调用 store 中的更新方法
  const result = await userStore.updateUserInfo(form.value)
  if (result.success) {
    // 更新成功后的处理逻辑可以在这里添加
    console.log('用户信息更新成功')
  }
}
</script>
<template>
  <page-container title="基本资料">
    <!-- 表单部分 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
.el-form-item .el-input {
  width: 400px;
}
</style>
