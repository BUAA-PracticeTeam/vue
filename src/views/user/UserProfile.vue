<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/modules/user.js'
import { User, UserFilled, Check, Refresh, Edit } from '@element-plus/icons-vue'

const formRef = ref()
const userStore = useUserStore()

// 使用计算属性从 store 获取用户信息
const user = computed(() => userStore.getUser())
const username = computed(() => user.value.username)
const nickname = computed(() => user.value.nickname)
const email = computed(() => user.value.email)
const signature = computed(() => user.value.signature)
const introduction = computed(() => user.value.introduction)
const work = computed(() => user.value.work)
const permission = computed(() => user.value.permission)

// 创建响应式的表单数据
const form = ref({
  username: '',
  nickname: '',
  email: '',
  signature: '',
  introduction: '',
  work: '',
})

// 监听用户信息变化，更新表单数据
const updateFormFromStore = () => {
  form.value = {
    username: username.value,
    nickname: nickname.value,
    email: email.value,
    signature: signature.value,
    introduction: introduction.value,
    work: work.value,
  }
}

// 初始化表单数据
updateFormFromStore()

// 工作选项
const workOptions = [
  { label: '队长', value: '队长' },
  { label: '副队长', value: '副队长' },
  { label: '课程组', value: '课程组' },
  { label: '宣传组', value: '宣传组' },
  { label: '开发组', value: '开发组' },
]

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
  signature: [
    { required: false, message: '请输入个性签名', trigger: 'blur' },
    { max: 50, message: '个性签名不能超过50个字符', trigger: 'blur' },
  ],
  introduction: [
    { required: false, message: '请输入自我介绍', trigger: 'blur' },
    { max: 500, message: '自我介绍不能超过500个字符', trigger: 'blur' },
  ],
  work: [{ required: false, message: '请选择工作职责', trigger: 'change' }],
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
  <page-container title="个人资料">
    <div class="profile-container">
      <div class="profile-layout">
        <!-- 左侧：基本信息 -->
        <div class="left-panel">
          <div class="panel-card">
            <h3 class="panel-title">
              <el-icon><User /></el-icon>
              基本信息
            </h3>
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-width="100px"
              class="basic-form"
            >
              <el-form-item label="登录名称">
                <el-input v-model="form.username" disabled class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="用户权限">
                <div class="permission-display">
                  <el-tag
                    v-if="permission === 1"
                    type="success"
                    size="large"
                    class="permission-tag"
                  >
                    <el-icon><UserFilled /></el-icon>
                    管理员
                  </el-tag>
                  <el-tag v-else type="info" size="large" class="permission-tag">
                    <el-icon><User /></el-icon>
                    普通用户
                  </el-tag>
                </div>
              </el-form-item>
              <el-form-item label="用户姓名" prop="nickname">
                <el-input v-model="form.nickname" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="用户邮箱" prop="email">
                <el-input v-model="form.email" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="工作职责" prop="work">
                <el-select v-model="form.work" placeholder="请选择工作职责" class="form-input">
                  <el-option
                    v-for="option in workOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 右侧：个人介绍 -->
        <div class="right-panel">
          <div class="panel-card">
            <h3 class="panel-title">
              <el-icon><Edit /></el-icon>
              个人介绍
            </h3>
            <el-form :model="form" label-width="100px" class="intro-form">
              <el-form-item label="个性签名" prop="signature">
                <el-input
                  v-model="form.signature"
                  placeholder="一句话，可以是人生格言..."
                  maxlength="50"
                  show-word-limit
                  class="form-input signature-input"
                ></el-input>
              </el-form-item>
              <el-form-item label="自我介绍" prop="introduction">
                <el-input
                  v-model="form.introduction"
                  type="textarea"
                  :rows="12"
                  placeholder="请介绍一下自己，包括你的技能、经历、兴趣爱好等..."
                  maxlength="500"
                  show-word-limit
                  class="form-input introduction-textarea"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div class="bottom-actions">
        <el-button type="primary" size="large" @click="submitForm" class="submit-btn">
          <el-icon><Check /></el-icon>
          保存修改
        </el-button>
        <el-button size="large" @click="updateFormFromStore" class="reset-btn">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </div>
    </div>
  </page-container>
</template>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
}

.left-panel,
.right-panel {
  min-height: 400px;
}

.panel-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 25px;
  height: 100%;
  transition: all 0.3s ease;
}

.panel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 3px solid #409eff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-title .el-icon {
  font-size: 24px;
  color: #409eff;
}

.basic-form,
.intro-form {
  height: calc(100% - 70px);
}

.form-input {
  width: 100%;
}

.signature-input {
  font-style: italic;
}

.introduction-textarea {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  resize: vertical;
}

.permission-display {
  display: flex;
  align-items: center;
}

.permission-tag {
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.permission-tag .el-icon {
  font-size: 18px;
}

.bottom-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 25px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.submit-btn {
  min-width: 140px;
  height: 48px;
  font-size: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.4);
}

.reset-btn {
  min-width: 140px;
  height: 48px;
  font-size: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .profile-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .left-panel,
  .right-panel {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }

  .panel-card {
    padding: 20px;
  }

  .bottom-actions {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .submit-btn,
  .reset-btn {
    width: 100%;
    max-width: 300px;
  }
}

/* 表单项样式优化 */
:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 2px solid #f0f0f0;
}

:deep(.el-input__wrapper:hover) {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

:deep(.el-textarea__inner) {
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 2px solid #f0f0f0;
  padding: 12px;
}

:deep(.el-textarea__inner:hover) {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

:deep(.el-textarea__inner:focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 10px;
}

/* 字数统计样式 */
:deep(.el-input__count) {
  color: #909399;
  font-size: 12px;
  font-weight: 500;
}

/* 禁用状态样式 */
:deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #f8f9fa;
  border-color: #e9ecef;
  color: #6c757d;
}

/* 下拉选择框样式 */
:deep(.el-select-dropdown) {
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

:deep(.el-select-dropdown__item) {
  padding: 12px 20px;
  font-size: 14px;
}

:deep(.el-select-dropdown__item:hover) {
  background-color: #f0f9ff;
  color: #409eff;
}

:deep(.el-select-dropdown__item.is-selected) {
  background-color: #409eff;
  color: #fff;
}
</style>
