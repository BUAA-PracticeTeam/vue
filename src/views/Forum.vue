<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { defineOptions } from 'vue'

// 设置组件名称
defineOptions({
  name: 'ForumPage',
})

// 响应式数据
const showEditor = ref(false)
const posts = ref([
  {
    id: 1,
    author: '袁子轩',
    title: '暑期支教活动招募志愿者',
    content:
      '我们计划在7月15日至7月30日前往贵州省某小学开展支教活动，现招募志愿者10名，欢迎报名参加！',
    date: new Date(2025, 5, 10),
    likes: 15,
  },
  {
    id: 2,
    author: '袁子轩',
    title: '环保宣传活动总结',
    content: '上周六在中央公园开展的环保宣传活动非常成功，感谢所有参与的队员和市民朋友！',
    date: new Date(2025, 5, 5),
    likes: 8,
  },
])

const newPost = ref({
  author: '',
  title: '',
  content: '',
})

// 方法
const addPost = () => {
  const newId = posts.value.length > 0 ? Math.max(...posts.value.map((p) => p.id)) + 1 : 1
  posts.value.unshift({
    id: newId,
    author: newPost.value.author,
    title: newPost.value.title,
    content: newPost.value.content,
    date: new Date(),
    likes: 0,
  })
  newPost.value = { author: '', title: '', content: '' }
  showEditor.value = false
}

const likePost = (id) => {
  const post = posts.value.find((p) => p.id === id)
  if (post) {
    post.likes++
  }
}

const formatDate = (date) => {
  return (
    date.toLocaleDateString('zh-CN') +
    ' ' +
    date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )
}
</script>

<template>
  <div class="forum-page">
    <div class="container">
      <div class="forum">
        <div class="section-title">
          <h2>交流论坛</h2>
        </div>

        <!-- 帖子列表 -->
        <div class="posts">
          <transition-group name="slide-up" tag="div">
            <div class="post" v-for="post in posts" :key="post.id">
              <div class="post-header">
                <span class="post-author">{{ post.author }}</span>
                <span class="post-date">{{ formatDate(post.date) }}</span>
              </div>
              <h4>{{ post.title }}</h4>
              <div class="post-content" v-html="post.content"></div>
              <div class="post-actions">
                <button @click="likePost(post.id)">
                  <i class="fa fa-thumbs-up"></i> 点赞 ({{ post.likes }})
                </button>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- 浮动发帖按钮 -->
        <button class="floating-post-btn" @click="showEditor = true">
          <i class="fa fa-plus"></i>
        </button>

        <!-- 富文本编辑器弹窗 -->
        <div class="modal-overlay" v-if="showEditor" @click.self="showEditor = false">
          <div class="post-editor-modal">
            <div class="modal-header">
              <h3>发表新帖</h3>
              <button class="close-btn" @click="showEditor = false">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="author">姓名</label>
                <input type="text" id="author" v-model="newPost.author" required />
              </div>
              <div class="form-group">
                <label for="title">标题</label>
                <input type="text" id="title" v-model="newPost.title" required />
              </div>
              <div class="form-group">
                <label for="content">内容</label>
                <!-- 这里可以替换为实际的富文本编辑器组件 -->
                <quill-editor v-model="newPost.content" theme="snow"></quill-editor>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn cancel-btn" @click="showEditor = false">取消</button>
              <button class="btn submit-btn" @click="addPost">发布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模糊遮罩仅覆盖论坛内容 -->
    <div class="forum-blur-mask">
      <div class="forum-blur-tip">论坛功能待完善</div>
    </div>
  </div>
</template>

<style scoped>
.forum-page {
  padding: 2rem 0;
  padding-top: 100px;
}

.forum {
  width: 70%;
  margin: 0 auto;
  background-color: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
  position: relative;
}

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

.posts {
  padding-top: 1rem;
}

.post {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-author {
  font-weight: 700;
  color: #2989d8;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
}

.post-content {
  margin-bottom: 1rem;
}

.post-actions {
  display: flex;
  gap: 1rem;
}

.post-actions button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.post-actions button:hover {
  color: #2989d8;
}

/* 浮动按钮样式 */
.floating-post-btn {
  position: fixed;
  top: 12rem;
  right: 8rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2989d8;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.floating-post-btn:hover {
  background: #1e5799;
  transform: scale(1.1);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.post-editor-modal {
  background: white;
  width: 600px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2989d8;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #2989d8;
  outline: none;
}

.form-group textarea {
  min-height: 200px;
  resize: vertical;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.submit-btn {
  background: #2989d8;
  color: white;
}

.submit-btn:hover {
  background: #1e5799;
}

/* 动画效果 */
.slide-up-enter-active {
  transition: all 0.3s ease;
}

.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.forum-blur-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 86%;
  z-index: 20;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
}
.forum-blur-tip {
  font-size: 2.2rem;
  color: #2989d8;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.85);
  padding: 2.5rem 4rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 2px solid #ffcc00;
}
</style>
