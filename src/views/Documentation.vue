<template>
  <div class="documentation-page">
    <div class="container">
      <div class="doc-header">
        <div class="header-icon">📚</div>
        <h1>功能文档</h1>
        <p>蒲公英-乡野航迹实践队网站功能详细介绍</p>
      </div>

      <div class="doc-content">
        <!-- 导航目录 -->
        <div class="doc-nav">
          <h3>目录</h3>
          <ul>
            <li><a href="#overview">系统概述</a></li>
            <li><a href="#pages">页面功能</a></li>
            <li><a href="#components">组件说明</a></li>
            <li><a href="#features">特色功能</a></li>
            <li><a href="#usage">使用指南</a></li>
          </ul>
        </div>

        <!-- 系统概述 -->
        <section id="overview" class="doc-section">
          <h2>系统概述</h2>
          <p>
            蒲公英-乡野航迹实践队网站是一个现代化的团队展示和交流平台，采用Vue.js 3 +
            Vite技术栈构建，具有响应式设计，支持桌面端和移动端访问。网站集成了用户认证、内容管理、团队展示、图片画廊、AI助手聊天等功能模块，为实践队成员和访客提供全面的信息展示和互动体验。
          </p>

          <div class="tech-stack">
            <h3>技术栈</h3>
            <div class="tech-grid">
              <div class="tech-item"><strong>前端框架：</strong>Vue.js 3 + Composition API</div>
              <div class="tech-item"><strong>构建工具：</strong>Vite</div>
              <div class="tech-item"><strong>UI组件库：</strong>Ant Design Vue</div>
              <div class="tech-item"><strong>状态管理：</strong>Pinia</div>
              <div class="tech-item"><strong>路由管理：</strong>Vue Router 4</div>
              <div class="tech-item"><strong>样式：</strong>CSS3 + 响应式设计</div>
            </div>
          </div>
        </section>

        <!-- 页面功能 -->
        <section id="pages" class="doc-section">
          <h2>页面功能</h2>

          <div class="page-item layout-left">
            <div class="item-content">
              <div class="item-main">
                <h3>🏠 首页 (About.vue)</h3>
                <p>
                  网站的主页，展示实践队的核心信息和特色。包含团队介绍横幅、实践成果展示、成员风采轮播图、学校徽章展示等功能模块。页面采用响应式设计，在不同设备上都能提供良好的浏览体验。
                </p>
              </div>
              <div class="item-sidebar">
                <div class="feature-list">
                  <h4>主要功能：</h4>
                  <ul>
                    <li>团队介绍横幅展示</li>
                    <li>实践成果和荣誉展示</li>
                    <li>成员风采图片轮播</li>
                    <li>合作学校徽章展示</li>
                    <li>响应式布局适配</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="page-item layout-right">
            <div class="item-content">
              <div class="item-sidebar">
                <div class="feature-list">
                  <h4>主要功能：</h4>
                  <ul>
                    <li>成员信息卡片展示</li>
                    <li>按学校筛选功能</li>
                    <li>数据刷新功能</li>
                    <li>响应式网格布局</li>
                    <li>成员详情查看</li>
                  </ul>
                </div>
              </div>
              <div class="item-main">
                <h3>👥 队员介绍 (Team.vue)</h3>
                <p>
                  展示实践队所有成员的详细信息页面。每个成员卡片包含头像、姓名、学校、专业、个人介绍等信息。支持按学校筛选成员，提供刷新功能更新数据。页面采用网格布局，在移动端自动调整为单列显示。
                </p>
              </div>
            </div>
          </div>

          <div class="page-item layout-center">
            <div class="item-content">
              <div class="item-main">
                <h3>📸 精彩回顾 (Gallery.vue)</h3>
                <p>
                  展示实践队活动照片和视频的画廊页面。支持图片预览、放大查看、轮播浏览等功能。页面采用瀑布流布局，自动加载更多内容，提供良好的图片浏览体验。
                </p>
              </div>
              <div class="item-features">
                <div class="feature-grid">
                  <div class="feature-card">
                    <div class="feature-icon">🖼️</div>
                    <h5>瀑布流展示</h5>
                    <p>图片瀑布流展示</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h5>图片预览</h5>
                    <p>图片预览和放大</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🔄</div>
                    <h5>轮播浏览</h5>
                    <p>轮播浏览模式</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h5>移动优化</h5>
                    <p>移动端触摸优化</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="page-item">
            <h3>💬 论坛 (Forum.vue)</h3>
            <p>
              团队成员和访客交流讨论的平台。用户可以发布文章、评论互动、分享经验。支持文章分类、搜索、排序等功能，为团队提供知识分享和交流的空间。
            </p>
            <div class="feature-list">
              <h4>主要功能：</h4>
              <ul>
                <li>文章发布和编辑</li>
                <li>评论互动系统</li>
                <li>文章分类管理</li>
                <li>搜索和排序</li>
                <li>用户权限控制</li>
              </ul>
            </div>
          </div>

          <div class="page-item">
            <h3>👤 个人中心 (PersonalCenter.vue)</h3>
            <p>
              用户个人信息管理页面，包含多个子页面模块。用户可以管理个人资料、修改头像、更改密码、管理文章等。页面采用侧边栏导航布局，在移动端自动切换为汉堡菜单。
            </p>
            <div class="feature-list">
              <h4>子页面功能：</h4>
              <ul>
                <li><strong>个人资料：</strong>编辑个人信息、学校、专业等</li>
                <li><strong>头像设置：</strong>上传和裁剪个人头像</li>
                <li><strong>密码修改：</strong>安全修改登录密码</li>
                <li><strong>文章管理：</strong>管理个人发布的文章</li>
              </ul>
            </div>
          </div>

          <div class="page-item">
            <h3>🔐 认证页面 (AuthPage.vue)</h3>
            <p>
              用户登录和注册的统一页面。支持账号密码登录和注册功能，具有表单验证、错误提示、登录状态管理等功能。页面采用滑动切换设计，在移动端提供良好的用户体验。
            </p>
            <div class="feature-list">
              <h4>主要功能：</h4>
              <ul>
                <li>用户登录和注册</li>
                <li>表单验证和错误提示</li>
                <li>登录状态管理</li>
                <li>响应式表单设计</li>
                <li>安全认证机制</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 组件说明 -->
        <section id="components" class="doc-section">
          <h2>组件说明</h2>

          <div class="components-grid">
            <div class="component-item">
              <div class="component-icon">🧭</div>
              <h3>导航栏 (NavBar.vue)</h3>
              <p>
                网站顶部导航组件，提供页面跳转和用户状态显示。包含logo、导航菜单、用户入口等功能。支持响应式设计，在移动端自动切换为汉堡菜单。
              </p>
            </div>

            <div class="component-item">
              <div class="component-icon">🤖</div>
              <h3>聊天窗口 (ChatWindow.vue)</h3>
              <p>
                AI助手聊天组件，提供智能对话功能。支持实时聊天、消息历史记录、移动端优化等功能。聊天记录存储在本地Pinia状态管理中。
              </p>
            </div>

            <div class="component-item">
              <div class="component-icon">🖼️</div>
              <h3>图片轮播 (ImageCarousel.vue)</h3>
              <p>
                图片轮播展示组件，用于首页成员风采展示。支持自动播放、手动切换、触摸滑动等功能。
              </p>
            </div>

            <div class="component-item">
              <div class="component-icon">🚪</div>
              <h3>用户入口 (SelfEntry.vue)</h3>
              <p>
                用户状态显示和操作入口组件。显示用户头像、登录状态，提供个人中心和退出登录功能。
              </p>
            </div>

            <div class="component-item">
              <div class="component-icon">📄</div>
              <h3>页脚栏 (FooterBar.vue)</h3>
              <p>网站底部信息展示组件，包含版权信息、联系方式等。</p>
            </div>
          </div>
        </section>

        <!-- 特色功能 -->
        <section id="features" class="doc-section">
          <h2>特色功能</h2>

          <div class="features-timeline">
            <div class="feature-item">
              <div class="timeline-marker">1</div>
              <div class="feature-content">
                <h3>🤖 AI助手聊天</h3>
                <p>
                  集成智能AI助手，为用户提供实时对话服务。支持多种对话模式，聊天记录本地存储，提供个性化的智能交互体验。
                </p>
              </div>
            </div>

            <div class="feature-item">
              <div class="timeline-marker">2</div>
              <div class="feature-content">
                <h3>📱 响应式设计</h3>
                <p>
                  全站采用响应式设计，完美适配桌面端、平板和移动设备。所有页面和组件都经过移动端优化，确保在各种设备上都有良好的用户体验。
                </p>
              </div>
            </div>

            <div class="feature-item">
              <div class="timeline-marker">3</div>
              <div class="feature-content">
                <h3>🔒 用户认证系统</h3>
                <p>
                  完整的用户认证和权限管理系统，支持用户注册、登录、个人信息管理等功能。采用安全的认证机制，保护用户数据安全。
                </p>
              </div>
            </div>

            <div class="feature-item">
              <div class="timeline-marker">4</div>
              <div class="feature-content">
                <h3>📝 内容管理系统</h3>
                <p>
                  支持文章发布、编辑、管理等功能，为用户提供内容创作和分享平台。包含富文本编辑器、图片上传、分类管理等功能。
                </p>
              </div>
            </div>

            <div class="feature-item">
              <div class="timeline-marker">5</div>
              <div class="feature-content">
                <h3>🖼️ 图片画廊</h3>
                <p>
                  专业的图片展示系统，支持瀑布流布局、图片预览、轮播浏览等功能。优化了移动端的触摸体验和图片加载性能。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用指南 -->
        <section id="usage" class="doc-section">
          <h2>使用指南</h2>

          <div class="usage-item">
            <h3>👀 访客使用</h3>
            <p>
              访客可以浏览首页了解团队信息，查看队员介绍页面了解成员详情，在精彩回顾页面查看活动照片，使用AI助手进行智能对话。所有公开内容都可以自由访问。
            </p>
          </div>

          <div class="usage-item">
            <h3>👤 注册用户</h3>
            <p>
              用户注册后可以登录系统，在个人中心管理个人信息，发布和编辑文章，参与论坛讨论，使用更多个性化功能。
            </p>
          </div>

          <div class="usage-item">
            <h3>📱 移动端使用</h3>
            <p>
              网站完全支持移动端访问，所有功能都经过移动端优化。导航栏在移动端自动切换为汉堡菜单，图片浏览支持触摸操作，表单输入适配移动键盘。
            </p>
          </div>

          <div class="usage-item">
            <h3>🤖 AI助手使用</h3>
            <p>
              点击页面右下角的聊天图标即可打开AI助手。支持多种对话模式，可以询问团队信息、获取帮助、进行智能对话等。聊天记录会保存在本地，刷新页面不会丢失。
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// 定义组件名称
defineOptions({
  name: 'DocumentationPage',
})

onMounted(() => {
  // 平滑滚动到锚点
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  })

  // 添加滚动动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)

  // 观察所有文档区块
  const sections = document.querySelectorAll('.doc-section')
  sections.forEach((section) => {
    section.style.opacity = '0'
    section.style.transform = 'translateY(30px)'
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(section)
  })
})
</script>

<style scoped>
.documentation-page {
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.documentation-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 60px 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
}

.doc-header h1 {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  font-weight: 800;
  letter-spacing: -1px;
}

.doc-header p {
  font-size: 1.3rem;
  color: #6c757d;
  margin: 0;
  font-weight: 500;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.doc-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.doc-nav {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.doc-nav h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 700;
  position: relative;
}

.doc-nav h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.doc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.doc-nav li {
  margin: 0;
}

.doc-nav a {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: block;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.doc-nav a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: left 0.3s ease;
  z-index: -1;
}

.doc-nav a:hover {
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.doc-nav a:hover::before {
  left: 0;
}

.doc-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.doc-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.doc-section h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 3px solid;
  border-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1;
  font-weight: 700;
  position: relative;
}

.doc-section h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 50px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.doc-section h3 {
  color: #34495e;
  font-size: 1.4rem;
  margin: 25px 0 15px 0;
}

.doc-section p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.tech-stack {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 25px;
  border-radius: 15px;
  margin-top: 25px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.tech-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 18px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 基础样式 */
.page-item,
.component-item,
.feature-item,
.usage-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 25px;
  border-left: 4px solid #667eea;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.page-item::before,
.component-item::before,
.feature-item::before,
.usage-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.page-item:hover,
.component-item:hover,
.feature-item:hover,
.usage-item:hover {
  transform: translateX(5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.page-item:hover::before,
.component-item:hover::before,
.feature-item:hover::before,
.usage-item:hover::before {
  transform: scaleY(1);
}

/* 左右布局样式 */
.layout-left .item-content,
.layout-right .item-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  align-items: start;
}

.layout-right .item-content {
  grid-template-columns: 1fr 2fr;
}

.item-main h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 700;
}

.item-main p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 0;
}

.item-sidebar {
  background: rgba(102, 126, 234, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

/* 居中布局样式 */
.layout-center .item-content {
  text-align: center;
}

.layout-center .item-main {
  margin-bottom: 30px;
}

.item-features {
  margin-top: 20px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.feature-card h5 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 600;
}

.feature-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* 组件网格布局 */
.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.components-grid .component-item {
  text-align: center;
  padding: 30px 20px;
}

.component-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  display: block;
}

.components-grid .component-item h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
}

.components-grid .component-item p {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

/* 时间线布局 */
.features-timeline {
  position: relative;
  padding-left: 30px;
}

.features-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.features-timeline .feature-item {
  position: relative;
  margin-bottom: 40px;
  background: none;
  padding: 0;
  border: none;
  box-shadow: none;
}

.timeline-marker {
  position: absolute;
  left: -37px;
  top: 0;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.feature-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.feature-content:hover {
  transform: translateX(5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.feature-content h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
  font-weight: 700;
}

.feature-content p {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.page-item h3,
.component-item h3,
.feature-item h3,
.usage-item h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.feature-list {
  margin-top: 15px;
}

.feature-list h4 {
  color: #34495e;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.feature-list ul {
  list-style: none;
  padding-left: 0;
}

.feature-list li {
  background: rgba(255, 255, 255, 0.8);
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  border-left: 3px solid #667eea;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-list li:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-list li strong {
  color: #2c3e50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .doc-content {
    gap: 20px;
  }

  .doc-nav ul {
    flex-direction: column;
    align-items: center;
  }

  .doc-nav a {
    min-width: 120px;
    text-align: center;
  }

  .doc-header h1 {
    font-size: 2rem;
  }

  .doc-header p {
    font-size: 1rem;
  }

  .doc-section {
    padding: 20px;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .page-item,
  .component-item,
  .feature-item,
  .usage-item {
    padding: 15px;
  }

  /* 移动端布局调整 */
  .layout-left .item-content,
  .layout-right .item-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .components-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .features-timeline {
    padding-left: 20px;
  }

  .timeline-marker {
    left: -27px;
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .doc-header {
    padding: 30px 0;
  }

  .doc-header h1 {
    font-size: 1.8rem;
  }

  .doc-section h2 {
    font-size: 1.5rem;
  }

  .doc-section h3 {
    font-size: 1.2rem;
  }
}
</style>
