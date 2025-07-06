import request from '@/utils/request.js'

/**
 * 调用AI助手接口
 * @param {string} userMessage - 用户输入的消息
 * @param {Array} conversationHistory - 对话历史记录
 * @returns {Promise} 返回AI助手的回复
 */
export const fetchAIChat = async (userMessage, conversationHistory = []) => {
  return request.post('/api/ai_chat/', {
    user_message: userMessage,
    history: conversationHistory,
  })
}
