<script setup>
import { ref, onMounted, computed } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ArticleEdit from './ArticleEdit.vue'
import { formatTime } from '@/utils/format.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageContainer from '@/components/PageContainer.vue'
import { useMyArticleStore } from '@/stores/myArticle.js'
import { useUserStore } from '@/stores/user.js'

const myArticleStore = useMyArticleStore()
const userStore = useUserStore()
const articleList = computed(() => myArticleStore.myArticles)
const total = computed(() => myArticleStore.myTotal)

// 定义请求参数对象
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 6, // 固定每页6个
  state: '',
})

// 获取所有文章并做前端分页
const getArticleList = async () => {
  await myArticleStore.fetchAllMyArticles({
    username: userStore.user.username,
    state: params.value.state,
  })
  myArticleStore.paginateArticles(params.value.pagenum, params.value.pagesize)
}

onMounted(() => {
  getArticleList()
})

// 处理分页逻辑 - 移除size change，因为固定每页6个
const onCurrentChange = (page) => {
  params.value.pagenum = page
  myArticleStore.paginateArticles(params.value.pagenum, params.value.pagesize)
}

// 搜索逻辑 => 按照最新的条件，重新检索，从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1 // 重置页面
  getArticleList()
}

// 重置逻辑 => 将筛选条件清空，重新检索，从第一页开始展示
const onReset = () => {
  params.value.pagenum = 1 // 重置页面
  params.value.state = ''
  getArticleList()
}

const articleEditRef = ref()
// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

// 删除逻辑
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('此操作将永久删除该文章, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })

  const result = await myArticleStore.deleteArticle(row.id)
  if (result.success) {
    // 删除成功后，重新分页显示
    myArticleStore.paginateArticles(params.value.pagenum, params.value.pagesize)
    ElMessage.success(result.message)
  } else {
    ElMessage.error(result.message)
  }
}

// 添加或者编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item style="margin-left: auto">
        <span style="color: #666; font-size: 14px">共 {{ total }} 篇文章</span>
      </el-form-item>
    </el-form>

    <!-- 卡片式文章列表 -->
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col
        v-for="row in articleList"
        :key="row.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        style="margin-bottom: 20px"
      >
        <el-card
          shadow="hover"
          class="article-card"
          :style="row.cover ? { backgroundImage: `url(${row.cover})` } : {}"
        >
          <div class="card-overlay">
            <div class="card-title">{{ row.title }}</div>
            <div class="card-content">
              <div
                class="card-abstract"
                v-html="
                  row.content
                    ? row.content.replace(/<[^>]+>/g, '').slice(0, 60) +
                      (row.content.length > 60 ? '...' : '')
                    : ''
                "
              ></div>
            </div>
            <div class="card-footer">
              <span class="state-tag" :class="row.state === '已发布' ? 'published' : 'draft'">{{
                row.state
              }}</span>
              <span class="pub-date">{{ formatTime(row.pub_date) }}</span>
              <div class="card-actions">
                <el-button
                  circle
                  plain
                  type="primary"
                  :icon="Edit"
                  @click="onEditArticle(row)"
                  size="small"
                ></el-button>
                <el-button
                  circle
                  plain
                  type="danger"
                  :icon="Delete"
                  @click="onDeleteArticle(row)"
                  size="small"
                ></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      :page-size="6"
      :background="true"
      layout="prev, pager, next"
      :total="total"
      @current-change="onCurrentChange"
      style="position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%)"
      :pager-count="5"
      prev-text="上一页"
      next-text="下一页"
    />

    <!-- 添加编辑的抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped>
.article-card {
  display: flex;
  flex-direction: column;
  height: 240px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  box-shadow: 0 2px 16px #e6e6e6;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 6px 24px #d0d0d0;
  }
  .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.38);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding: 18px 18px 12px 18px;
  }
  .card-title {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    text-shadow:
      0 2px 8px #222,
      0 1px 0 #000;
    letter-spacing: 1px;
    line-height: 1.3;
    word-break: break-all;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 2;
  }
  .card-content,
  .card-footer {
    position: relative;
    z-index: 3;
  }
  .card-content {
    color: #f3f3f3;
    font-size: 1rem;
    margin-bottom: 10px;
    min-height: 32px;
    text-shadow: 0 1px 4px #222;
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .state-tag {
      font-size: 0.95rem;
      padding: 2px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.85);
      color: #1890ff;
      font-weight: bold;
      &.draft {
        color: #faad14;
      }
    }
    .pub-date {
      color: #eee;
      font-size: 0.92rem;
      margin-left: 10px;
      text-shadow: 0 1px 4px #222;
    }
    .card-actions {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
