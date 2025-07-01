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
            <li><i class="fa fa-envelope"></i> contact@youthteam.com</li>
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
              <router-link to="/gallery">活动相册</router-link>
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
            <a href="#"><i class="fa fa-weibo"></i></a>
            <a href="#"><i class="fa fa-weixin"></i></a>
            <a href="#"><i class="fa fa-qq"></i></a>
            <a href="#"><i class="fa fa-github"></i></a>
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
        <p>© 技术总监：CircleCoder</p>
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
