// src/api/authService.ts
import api from './index'

export const authService = {
  // 获取当前用户信息
  getCurrentUser() {
    return api.get('/user')
  },
  
  // 登出
  logout() {
    return api.get('/api/logout')
  }
}