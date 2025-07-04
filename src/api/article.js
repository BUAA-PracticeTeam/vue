import request from '@/utils/request'

// 文章：获取所有文章列表（分页/筛选）
export const artGetListService = (params) =>
  request.get('/my/article/list', {
    params,
  })

// 文章：获取当前用户所有文章（不分页，传username）
export const artGetMyListService = (params) => request.get('/my/article/mylist', { params })

// 文章：添加文章
// 注意：data需要是一个formData格式的对象
export const artPublishService = (data) => request.post('/my/article/add', data)

// 文章：获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: { id },
  })

// 文章：编辑文章接口
export const artEditService = (data) => request.post('/my/article/edit', data)

// 文章：删除文章接口
export const artDelService = (id) => request.delete('/my/article/delete', { params: { id } })
