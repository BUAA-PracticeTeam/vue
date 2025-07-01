<template>
  <div id="app">
    <nav>
      <NavBar />
    </nav>
    <router-view />
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
// 组件会自动注册模板中使用的组件
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import { defineOptions } from 'vue'

// 设置组件名称 (Vue 3.3+)
defineOptions({
  name: 'App',
})
</script>

<style>
/* 强制覆盖所有样式，包括浏览器默认样式 */
body {
  margin: 0 !important;
  padding: 0 !important;
  min-width: 100vw !important;
  overflow-x: hidden !important;
}

#app {
  margin: 0 !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
