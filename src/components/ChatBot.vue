<template>
  <div class="chat-bot-container" @click="toggleChat">
    <!-- 聊天小人 -->
    <div class="chat-bot" :class="{ 'chat-bot--active': isChatOpen }">
      <!-- 头部 -->
      <div class="chat-bot__head">
        <div class="chat-bot__eyes">
          <div class="chat-bot__eye chat-bot__eye--left"></div>
          <div class="chat-bot__eye chat-bot__eye--right"></div>
        </div>
        <div class="chat-bot__mouth"></div>
      </div>

      <!-- 身体 -->
      <div class="chat-bot__body">
        <div class="chat-bot__antenna">
          <div class="chat-bot__antenna-dot"></div>
        </div>
        <div class="chat-bot__screen">
          <div class="chat-bot__screen-content">
            <span class="chat-bot__text">AI</span>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <div class="chat-bot__base">
        <div class="chat-bot__base-dot"></div>
        <div class="chat-bot__base-dot"></div>
        <div class="chat-bot__base-dot"></div>
      </div>
    </div>

    <!-- 提示气泡 -->
    <div class="chat-bot__bubble" v-if="!isChatOpen">
      <span>点击和我聊天吧！</span>
      <div class="chat-bot__bubble-arrow"></div>
    </div>

    <!-- 脉冲效果 -->
    <div class="chat-bot__pulse"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isChatOpen = ref(false)

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  // 触发父组件事件
  emit('toggle-chat', isChatOpen.value)
}

const emit = defineEmits(['toggle-chat'])
</script>

<style scoped>
.chat-bot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
  user-select: none;
}

.chat-bot {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 3s ease-in-out infinite;
}

.chat-bot:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

.chat-bot--active {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  animation: bounce 0.6s ease-in-out;
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

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

/* 头部 */
.chat-bot__head {
  width: 60px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 30px 30px 20px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

/* 眼睛 */
.chat-bot__eyes {
  display: flex;
  gap: 8px;
  margin-bottom: 5px;
}

.chat-bot__eye {
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
  animation: blink 3s infinite;
}

.chat-bot__eye--left {
  animation-delay: 0s;
}

.chat-bot__eye--right {
  animation-delay: 0.1s;
}

@keyframes blink {
  0%,
  90%,
  100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
}

/* 嘴巴 */
.chat-bot__mouth {
  width: 12px;
  height: 6px;
  border: 2px solid #333;
  border-top: none;
  border-radius: 0 0 12px 12px;
  animation: smile 2s ease-in-out infinite;
}

@keyframes smile {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.2);
  }
}

/* 身体 */
.chat-bot__body {
  width: 50px;
  height: 25px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 天线 */
.chat-bot__antenna {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 12px;
  background: #333;
  border-radius: 1px;
}

.chat-bot__antenna-dot {
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1.2);
  }
}

/* 屏幕 */
.chat-bot__screen {
  width: 35px;
  height: 15px;
  background: #2c3e50;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.chat-bot__screen-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-bot__text {
  color: #00ff88;
  font-size: 8px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  animation: typing 2s infinite;
}

@keyframes typing {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 底部 */
.chat-bot__base {
  display: flex;
  gap: 4px;
  margin-top: 3px;
}

.chat-bot__base-dot {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: basePulse 1.5s infinite;
}

.chat-bot__base-dot:nth-child(1) {
  animation-delay: 0s;
}

.chat-bot__base-dot:nth-child(2) {
  animation-delay: 0.5s;
}

.chat-bot__base-dot:nth-child(3) {
  animation-delay: 1s;
}

@keyframes basePulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* 提示气泡 */
.chat-bot__bubble {
  position: absolute;
  bottom: 100px;
  right: 0;
  background: white;
  padding: 8px 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  animation: bubbleFloat 2s ease-in-out infinite;
  opacity: 0;
  animation: bubbleAppear 0.5s ease-out 1s forwards;
}

@keyframes bubbleAppear {
  to {
    opacity: 1;
  }
}

@keyframes bubbleFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.chat-bot__bubble-arrow {
  position: absolute;
  bottom: -6px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid white;
}

/* 脉冲效果 */
.chat-bot__pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: pulseRing 2s infinite;
}

@keyframes pulseRing {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-bot-container {
    bottom: 20px;
    right: 20px;
  }

  .chat-bot {
    width: 70px;
    height: 70px;
  }

  .chat-bot__head {
    width: 50px;
    height: 35px;
  }

  .chat-bot__body {
    width: 40px;
    height: 20px;
  }

  .chat-bot__bubble {
    font-size: 11px;
    padding: 6px 10px;
  }
}
</style>
