<template>
  <div class="chat-window" :class="{ 'chat-window--open': isOpen }">
    <!-- 聊天窗口头部 -->
    <div class="chat-window__header">
      <div class="chat-window__header-info">
        <div class="chat-window__avatar">
          <div class="chat-window__avatar-icon">🤖</div>
        </div>
        <div class="chat-window__header-text">
          <h3 class="chat-window__title">AI 助手</h3>
          <p class="chat-window__status">在线 · 随时为您服务</p>
        </div>
      </div>
      <button class="chat-window__close" @click="closeChat">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- 消息列表 -->
    <div class="chat-window__messages" ref="messagesContainer">
      <!-- 欢迎消息 -->
      <div
        class="chat-window__message chat-window__message--bot"
        v-for="(message, index) in messages"
        :key="index"
      >
        <div class="chat-window__message-avatar">
          <div class="chat-window__message-avatar-icon">🤖</div>
        </div>
        <div class="chat-window__message-content">
          <div class="chat-window__message-bubble">
            {{ message.content }}
          </div>
          <div class="chat-window__message-time">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>

      <!-- 对话消息 - 按时间顺序显示 -->
      <template v-for="(conversation, index) in conversationHistory" :key="'conv-' + index">
        <!-- 用户消息 -->
        <div class="chat-window__message chat-window__message--user">
          <div class="chat-window__message-avatar">
            <div class="chat-window__message-avatar-icon">👤</div>
          </div>
          <div class="chat-window__message-content">
            <div class="chat-window__message-bubble">
              {{ conversation.userMessage.content }}
            </div>
            <div class="chat-window__message-time">
              {{ formatTime(conversation.userMessage.timestamp) }}
            </div>
          </div>
        </div>

        <!-- AI回复消息 - 只在有回复时显示 -->
        <div class="chat-window__message chat-window__message--bot" v-if="conversation.botMessage">
          <div class="chat-window__message-avatar">
            <div class="chat-window__message-avatar-icon">🤖</div>
          </div>
          <div class="chat-window__message-content">
            <div class="chat-window__message-bubble">
              {{ conversation.botMessage.content }}
            </div>
            <div class="chat-window__message-time">
              {{ formatTime(conversation.botMessage.timestamp) }}
            </div>
          </div>
        </div>
      </template>

      <!-- 输入中状态 -->
      <div class="chat-window__message chat-window__message--bot" v-if="isTyping">
        <div class="chat-window__message-avatar">
          <div class="chat-window__message-avatar-icon">🤖</div>
        </div>
        <div class="chat-window__message-content">
          <div class="chat-window__message-bubble chat-window__message-bubble--typing">
            <div class="chat-window__typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-window__input-area">
      <div class="chat-window__input-container">
        <textarea
          v-model="inputMessage"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift="newLine"
          placeholder="输入您的消息..."
          class="chat-window__input"
          rows="1"
          ref="inputRef"
        ></textarea>
        <button class="chat-window__send-btn" @click="sendMessage" :disabled="!inputMessage.trim()">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9"></polygon>
          </svg>
        </button>
      </div>
      <div class="chat-window__input-tips">
        <span>按 Enter 发送，Shift + Enter 换行</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const inputMessage = ref('')
const messages = ref([
  {
    content: '你好！我是您的AI助手，有什么可以帮助您的吗？',
    timestamp: new Date(),
  },
])
const conversationHistory = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)
const inputRef = ref(null)

// 格式化时间
const formatTime = (timestamp) => {
  const now = new Date()
  const messageTime = new Date(timestamp)
  const diff = now - messageTime

  if (diff < 60000) {
    // 1分钟内
    return '刚刚'
  } else if (diff < 3600000) {
    // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`
  } else {
    return messageTime.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const userMessage = {
    content: inputMessage.value.trim(),
    timestamp: new Date(),
  }

  inputMessage.value = ''

  // 立即显示用户消息
  conversationHistory.value.push({
    userMessage,
    botMessage: null, // 先设为null，等AI回复后再更新
  })

  await nextTick()
  scrollToBottom()

  // 显示AI正在输入状态
  isTyping.value = true
  await nextTick()
  scrollToBottom()

  // 模拟AI回复延迟
  setTimeout(() => {
    isTyping.value = false
    const botMessage = {
      content: getBotResponse(),
      timestamp: new Date(),
    }

    // 更新最后一条对话的AI回复
    const lastConversation = conversationHistory.value[conversationHistory.value.length - 1]
    lastConversation.botMessage = botMessage

    nextTick(() => {
      scrollToBottom()
    })
  }, 1500)
}

// 换行
const newLine = () => {
  inputMessage.value += '\n'
}

// 关闭聊天
const closeChat = () => {
  emit('close')
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 简单的AI回复逻辑
const getBotResponse = () => {
  const responses = [
    '我理解您的问题，让我为您详细解答...',
    '这是一个很有趣的问题！',
    '根据我的分析，我建议您...',
    '谢谢您的提问，我会尽力帮助您。',
    '我明白您的需求，让我为您提供一些建议...',
    '这是一个很好的观点，让我从另一个角度为您分析...',
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

// 监听聊天窗口打开状态
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        scrollToBottom()
        inputRef.value?.focus()
      })
    }
  },
)

// 自动调整输入框高度
const adjustTextareaHeight = () => {
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
    inputRef.value.style.height = inputRef.value.scrollHeight + 'px'
  }
}

watch(inputMessage, () => {
  nextTick(adjustTextareaHeight)
})

onMounted(() => {
  if (props.isOpen) {
    nextTick(() => {
      scrollToBottom()
      inputRef.value?.focus()
    })
  }
})
</script>

<style scoped>
.chat-window {
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 380px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 999;
  transform: translateY(20px) scale(0.9);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.chat-window--open {
  transform: translateY(0) scale(1);
  opacity: 1;
  visibility: visible;
}

/* 头部 */
.chat-window__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

.chat-window__header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-window__avatar {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-window__avatar-icon {
  font-size: 20px;
}

.chat-window__header-text {
  flex: 1;
}

.chat-window__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chat-window__status {
  margin: 2px 0 0 0;
  font-size: 12px;
  opacity: 0.8;
}

.chat-window__close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-window__close:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 消息列表 */
.chat-window__messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-window__messages::-webkit-scrollbar {
  width: 4px;
}

.chat-window__messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.chat-window__messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.chat-window__message {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.chat-window__message--user {
  flex-direction: row-reverse;
}

.chat-window__message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-window__message--bot .chat-window__message-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.chat-window__message--user .chat-window__message-avatar {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.chat-window__message-avatar-icon {
  font-size: 16px;
}

.chat-window__message-content {
  flex: 1;
  max-width: 70%;
}

.chat-window__message--user .chat-window__message-content {
  text-align: right;
}

.chat-window__message-bubble {
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  display: inline-block;
  max-width: 100%;
}

.chat-window__message--user .chat-window__message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chat-window__message-bubble--typing {
  background: #e9ecef;
  padding: 16px;
}

.chat-window__message-time {
  font-size: 11px;
  color: #6c757d;
  margin-top: 4px;
  padding: 0 4px;
}

.chat-window__message--user .chat-window__message-time {
  text-align: right;
}

/* 输入指示器 */
.chat-window__typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.chat-window__typing-indicator span {
  width: 8px;
  height: 8px;
  background: #6c757d;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.chat-window__typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.chat-window__typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 输入区域 */
.chat-window__input-area {
  padding: 16px;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

.chat-window__input-container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.chat-window__input {
  flex: 1;
  border: 1px solid #dee2e6;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.4;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
  max-height: 120px;
  min-height: 44px;
}

.chat-window__input:focus {
  border-color: #667eea;
}

.chat-window__send-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.chat-window__send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.chat-window__send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-window__input-tips {
  margin-top: 8px;
  text-align: center;
  font-size: 11px;
  color: #6c757d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-window {
    width: calc(100vw - 40px);
    height: calc(100vh - 200px);
    bottom: 100px;
    right: 20px;
    left: 20px;
  }

  .chat-window__message-content {
    max-width: 80%;
  }
}
</style>
