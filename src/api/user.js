import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, email, password }) =>
  request.post('/api/register/', { username, email, password })

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login/', { username, password })

// 更新用户基本信息
export const userUpdateInfoService = ({ id, nickname, username }) =>
  request.put('/my/userinfo', { id, nickname, username })

// 更新用户头像
export const userUpdateAvatarService = (avatar, username) =>
  request.patch('/my/update/avatar', { avatar, username })

// 更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, username }) =>
  request.patch('/my/update/pwd', { old_pwd, new_pwd, username })
