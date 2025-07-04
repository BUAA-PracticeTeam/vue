<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterBar',
})
</script>

<template>
  <footer class="site-footer animate__animated animate__fadeInUp">
    <div class="footer-container">
      <!-- 第一行：联系方式 -->
      <div class="footer-row">
        <div class="footer-col">
          <h3>联系我们</h3>
          <ul>
            <li><i class="fa fa-map-marker"></i> 北京市海淀区学院路37号</li>
            <li><i class="fa fa-phone"></i> 010-88889999</li>
            <li><i class="fa fa-envelope"></i> 3196932484@qq.com</li>
          </ul>
        </div>

        <!-- 第二列：快速链接 -->
        <div class="footer-col">
          <h3>快速链接</h3>
          <ul>
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/about">关于我们</router-link>
            </li>
            <li>
              <router-link to="/gallery">精彩回顾</router-link>
            </li>
            <li>
              <router-link to="/forum">交流论坛</router-link>
            </li>
          </ul>
        </div>

        <!-- 第三列：社交媒体 -->
        <div class="footer-col">
          <h3>关注我们</h3>
          <div class="social-links">
            <a href="#"><i class="fa fa-weixin"></i></a>
            <a href="https://github.com/CircleCoder05"><i class="fa fa-github"></i></a>
            <!-- B站 -->
            <a href="#" title="B站">
              <svg
                viewBox="0 0 1024 1024"
                width="1.5em"
                height="1.5em"
                fill="currentColor"
                style="vertical-align: middle"
              >
                <path
                  d="M320 128c0-17.7 14.3-32 32-32s32 14.3 32 32v32h256v-32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h24c70.7 0 128 57.3 128 128v448c0 70.7-57.3 128-128 128H232c-70.7 0-128-57.3-128-128V288c0-70.7 57.3-128 128-128h24v-32zm-88 160v416c0 39.8 32.2 72 72 72h560c39.8 0 72-32.2 72-72V288c0-39.8-32.2-72-72-72H232c-39.8 0-72 32.2-72 72zm192 128c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96c0-17.7 14.3-32 32-32zm176 32c0-17.7 14.3-32 32-32s32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96z"
                />
              </svg>
            </a>
            <!-- 抖音 -->
            <a href="#" title="抖音">
              <svg
                viewBox="0 0 1024 1024"
                width="1.5em"
                height="1.5em"
                fill="currentColor"
                style="vertical-align: middle"
              >
                <path
                  d="M800 384c-61.9 0-112-50.1-112-112V128h-96v576c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16-123.7 0-224 100.3-224 224s100.3 224 224 224 224-100.3 224-224V512c38.2 27.6 85 44 136 44v-96c-24.3 0-47.3-5.2-68-14.6V384z"
                />
              </svg>
            </a>
          </div>
          <div class="newsletter">
            <input type="email" placeholder="输入邮箱订阅" />
            <button>订阅</button>
          </div>
        </div>
      </div>

      <!-- 第二行：版权信息 -->
      <div class="copyright">
        <p>© 2025 蒲公英乡野航迹实践队 版权所有</p>
        <p>© 技术：CircleCoder</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: linear-gradient(135deg, #b5d2ee 0%, #207cca 100%);
  color: white;
  padding: 3rem 0 1.5rem;
  margin-top: 0rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-col {
  flex: 1;
  min-width: 200px;
}

.footer-col h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 10px;
  text-align: center;
}

.footer-col h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 60px;
  height: 2px;
  background: #ffcc00;
  left: 50%;
  transform: translateX(-50%);
}

.footer-col ul {
  list-style: none;
  text-align: center; /* 新增：让文本居中 */
  padding: 0; /* 移除默认padding */
}

.footer-col li {
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center; /* 新增：flex子项居中 */
  gap: 0.5rem;
}

.footer-col a {
  color: #ddd;
  transition: color 0.3s;
}

.footer-col a:hover {
  color: #ffcc00;
  text-decoration: none;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-links a {
  color: white;
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.social-links a:hover {
  transform: translateY(-3px);
  color: #ffcc00;
}

.newsletter {
  display: flex;
  margin-top: 1rem;
}

.newsletter input {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px 0 0 4px;
}

.newsletter button {
  background: #ffcc00;
  color: #333;
  border: none;
  padding: 0 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background 0.3s;
}

.newsletter button:hover {
  background: #ffdd33;
}

.copyright {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-col {
    flex: 100%;
    margin-bottom: 1.5rem;
  }

  .footer-col h3::after {
    width: 30px;
  }
}
</style>
