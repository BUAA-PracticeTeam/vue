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

/**
 * 流式调用AI助手接口
 * @param {string} userMessage - 用户输入的消息
 * @param {Array} conversationHistory - 对话历史记录
 * @param {Function} onChunk - 接收内容片段的回调函数
 * @param {Function} onDone - 流结束的回调函数
 * @param {Function} onError - 错误处理的回调函数
 * @returns {Promise} 返回完整的AI回复
 */
export const fetchAIChatStream = async (
  userMessage,
  conversationHistory = [],
  onChunk,
  onDone,
  onError,
) => {
  return new Promise((resolve, reject) => {
    try {
      // 创建POST请求获取流式响应
      fetch(
        // 'http://127.0.0.1:8000/api/ai_chat/stream/',
        'http://47.93.81.21:8000/api/ai_chat/stream/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_message: userMessage,
            history: conversationHistory,
          }),
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          let fullContent = ''

          function readStream() {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  console.log('流式响应完成')
                  onDone && onDone(fullContent)
                  resolve(fullContent)
                  return
                }

                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    try {
                      const data = JSON.parse(line.slice(6))

                      if (data.type === 'content') {
                        fullContent += data.content
                        onChunk && onChunk(data.content, fullContent)
                      } else if (data.type === 'done') {
                        console.log('流式响应结束')
                        onDone && onDone(fullContent)
                        resolve(fullContent)
                        return
                      } else if (data.type === 'error') {
                        console.error('流式响应错误:', data.message)
                        onError && onError(data.message)
                        reject(new Error(data.message))
                        return
                      }
                    } catch (e) {
                      console.warn('解析流式数据失败:', e)
                    }
                  }
                }

                // 继续读取
                readStream()
              })
              .catch((error) => {
                console.error('读取流式响应失败:', error)
                onError && onError(error.message)
                reject(error)
              })
          }

          readStream()
        })
        .catch((error) => {
          console.error('流式请求失败:', error)
          onError && onError(error.message)
          reject(error)
        })
    } catch (error) {
      console.error('创建流式请求失败:', error)
      onError && onError(error.message)
      reject(error)
    }
  })
}
