// src/api/energyService.ts
import api from './index'
import type { Transaction, EnergyAccount, Receiver } from '@/types'

export const energyService = {
  // 获取账户余额
  getBalance(): Promise<EnergyAccount> {
    return api.get('/api/account/balance')
  },

  // 获取交易历史
  getTransactions(): Promise<Transaction[]> {
    return api.get('/api/transactions')
  },

  // 执行能源转账
  transfer(receiverId: string, amount: number): Promise<Transaction> {
    return api.post('/api/transaction', {
      toAccountId: receiverId,
      amount
    })
  },

  // 获取可用接收方列表
  getReceivers(): Promise<Receiver[]> {
    return api.get('/api/receivers')
  }
}