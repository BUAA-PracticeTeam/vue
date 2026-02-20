import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAIChat, fetchAIChatStream } from '@/api/chat.js'

export const useChatStore = defineStore(
  'chat',
  () => {
    // 欢迎消息
    const welcomeMessage = ref({
      content: '你好！我是 CircleCoder 为您提供的 AI 助手，有什么可以帮助您的吗？',
      timestamp: new Date(),
    })

    // 对话历史记录
    const conversationHistory = ref([])

    // 添加用户消息
    const addUserMessage = (content) => {
      const userMessage = {
        content: content.trim(),
        timestamp: new Date(),
      }

      conversationHistory.value.push({
        userMessage,
        botMessage: null, // 先设为null，等AI回复后再更新
      })
    }

    // 添加AI回复消息
    const addBotMessage = (content) => {
      if (conversationHistory.value.length > 0) {
        const lastConversation = conversationHistory.value[conversationHistory.value.length - 1]
        lastConversation.botMessage = {
          content: content.trim(),
          timestamp: new Date(),
        }
      }
    }

    // 获取所有对话历史
    const getConversationHistory = () => {
      return conversationHistory.value
    }

    // 获取欢迎消息
    const getWelcomeMessage = () => {
      return welcomeMessage.value
    }

    // 清空对话历史
    const clearConversationHistory = () => {
      conversationHistory.value = []
    }

    // 获取对话总数
    const getConversationCount = () => {
      return conversationHistory.value.length
    }

    // 检查是否有对话历史
    const hasConversationHistory = () => {
      return conversationHistory.value.length > 0
    }

    // 获取AI回复（调用后端接口）
    const getAIResponse = async (userMessage) => {
      try {
        console.log('开始请求AI回复:', userMessage)
        const response = await fetchAIChat(userMessage, conversationHistory.value)
        console.log('收到后端响应:', response)

        if (response.data && response.data.success) {
          console.log('AI回复成功:', response.data.content.substring(0, 100) + '...')
          return response.data.content
        } else {
          console.error('AI回复失败:', response.data?.message || '未知错误')
          return '抱歉，AI助手暂时无法回复，请稍后再试。'
        }
      } catch (error) {
        console.error('AI回复请求失败:', error)
        console.error('错误详情:', error.response?.data || error.message)
        return '抱歉，网络连接异常，请检查网络后重试。'
      }
    }

    // 获取AI流式回复
    const getAIResponseStream = async (userMessage, onChunk, onDone, onError) => {
      try {
        console.log('开始流式请求AI回复:', userMessage)

        const fullContent = await fetchAIChatStream(
          userMessage,
          conversationHistory.value,
          onChunk, // 接收内容片段
          onDone, // 流结束
          onError, // 错误处理
        )

        return fullContent
      } catch (error) {
        console.error('AI流式回复请求失败:', error)
        return '抱歉，网络连接异常，请检查网络后重试。'
      }
    }

    return {
      welcomeMessage,
      conversationHistory,
      addUserMessage,
      addBotMessage,
      getAIResponse,
      getAIResponseStream,
      getConversationHistory,
      getWelcomeMessage,
      clearConversationHistory,
      getConversationCount,
      hasConversationHistory,
    }
  },
  {
    // 启用持久化存储，这样刷新页面后数据不会丢失
    persist: true,
  },
)
