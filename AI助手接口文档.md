# AI助手后端接口文档

## 概述

本文档描述了前端AI助手功能所需的后端接口规范。前端使用Pinia持久化存储对话历史，后端只需要提供AI对话接口。

## 基础信息

- **基础URL**: `http://127.0.0.1:8000` (根据你的后端配置调整)
- **请求头**: `Content-Type: application/json`
- **响应格式**: JSON

---

## AI对话接口

### 接口信息

- **路径**: `POST /api/ai_chat/`
- **功能**: 获取AI助手的智能回复
- **描述**: 接收用户消息和对话历史，返回AI助手的回复

### 请求参数

```json
{
  "user_message": "你好，我想了解你们团队",
  "history": [
    {
      "userMessage": {
        "content": "你好",
        "timestamp": "2024-01-01T10:00:00.000Z"
      },
      "botMessage": {
        "content": "你好！我是蒲公英乡野航迹实践队的AI助手，有什么可以帮助您的吗？",
        "timestamp": "2024-01-01T10:00:05.000Z"
      }
    }
  ]
}
```

#### 参数说明

- `user_message` (string, 必填): 用户当前输入的消息
- `history` (array, 可选): 对话历史记录数组，每个元素包含：
  - `userMessage`: 用户消息对象，包含 `content` 和 `timestamp`
  - `botMessage`: AI回复对象，包含 `content` 和 `timestamp`

### 响应格式

#### 成功响应

```json
{
  "success": true,
  "content": "你好！我是蒲公英乡野航迹实践队的AI助手。我们是一支成立于2023年的志愿服务团队，目前有50多位成员，主要开展乡村支教、环保宣传、社会调研等公益活动。很高兴为您服务！"
}
```

#### 错误响应

```json
{
  "success": false,
  "message": "AI服务暂时不可用，请稍后再试"
}
```

#### 响应字段说明

- `success` (boolean): 请求是否成功
- `content` (string): AI助手的回复内容
- `message` (string): 错误信息（仅在失败时返回）

---

## 实现建议

### 1. 知识库集成

建议在后端实现以下功能：

- 将团队信息、活动记录、FAQ等作为系统提示词
- 使用向量数据库存储团队知识，实现RAG检索增强
- 支持动态更新知识库内容

### 2. 安全考虑

- 添加请求频率限制
- 记录API调用日志
- 敏感信息过滤

### 3. 性能优化

- 添加响应时间监控
- 支持流式响应（可选）

---

## 测试用例

### 测试1: 基础对话

```bash
curl -X POST http://127.0.0.1:8000/api/ai_chat/ \
  -H "Content-Type: application/json" \
  -d '{"user_message": "你好"}'
```

### 测试2: 带历史的对话

```bash
curl -X POST http://127.0.0.1:8000/api/ai_chat/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "你们主要做什么活动？",
    "history": [
      {
        "userMessage": {"content": "你好", "timestamp": "2024-01-01T10:00:00.000Z"},
        "botMessage": {"content": "你好！我是蒲公英乡野航迹实践队的AI助手", "timestamp": "2024-01-01T10:00:05.000Z"}
      }
    ]
  }'
```

---

## 注意事项

1. **时间格式**: 所有时间戳使用ISO 8601格式
2. **字符编码**: 请求和响应都使用UTF-8编码
3. **错误处理**: 前端已实现错误处理，后端只需返回标准格式的错误响应
4. **CORS**: 确保后端支持跨域请求
5. **超时设置**: 建议设置合理的请求超时时间（如30秒）

---

## 前端特性

- ✅ 对话历史保存在前端Pinia store中
- ✅ 支持页面刷新后保持对话记录
- ✅ 支持清空对话历史
- ✅ 完善的错误处理和用户提示
- ✅ 无需后端存储，简化后端实现

---

## 联系信息

如有接口相关问题，请联系后端开发团队。
