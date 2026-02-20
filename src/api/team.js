import request from '@/utils/request'

// 获取所有团队成员
export const getTeamMembersService = () => request.get('/api/team/members/')
