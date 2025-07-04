<script lang="ts">
import { defineComponent } from 'vue'
import SelfEntry from '@/components/SelfEntry.vue'

export default defineComponent({
  name: 'NavBar',
  components: { SelfEntry },
})
</script>

<template>
  <header>
    <div class="container header-container">
      <router-link to="/" class="logo">
        <i class="fa fa-users"></i>
        <span>蒲公英乡野航迹实践队</span>
      </router-link>
      <nav>
        <ul>
          <li>
            <router-link to="/about">首页</router-link>
          </li>
          <li>
            <router-link to="/team">队员介绍</router-link>
          </li>
          <li>
            <router-link to="/gallery">精彩回顾</router-link>
          </li>
          <li>
            <router-link to="/forum">交流论坛</router-link>
          </li>
        </ul>
      </nav>
      <div class="nav-right">
        <SelfEntry />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 保持原有header样式不变 */
header {
  background: linear-gradient(135deg, #297ef2 0%, #74ec5c 51%, #b52cbf 100%);
  color: white;
  padding: 1rem 0;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  opacity: 90%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  width: 70%;
  align-items: center;
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
}

.logo i {
  margin-right: 20px;
  color: #ffcc00;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 2rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

nav ul li a:hover {
  color: #ffcc00;
}

nav ul li a.router-link-exact-active {
  color: #ffcc00;
}

nav ul li a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: #ffcc00;
  bottom: 0;
  left: 0;
  transition: width 0.3s ease;
}

nav ul li a:hover:after,
nav ul li a.router-link-exact-active:after {
  width: 100%;
}
</style>
