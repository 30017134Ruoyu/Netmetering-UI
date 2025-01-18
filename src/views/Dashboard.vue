<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="dashboard" @click="() => router.push('/dashboard')">
          <template #icon>
            <dashboard-outlined />
          </template>
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="transfer" @click="() => router.push('/transfer')">
          <template #icon>
            <swap-outlined />
          </template>
          <span>Transfer</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="float: right; margin-right: 24px">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{ username }}
              <down-outlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="handleProfile">Profile</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="handleLogout">Logout</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      
      <a-layout-content style="margin: 24px 16px 0">
        <div class="dashboard-content">
          
          <a-row :gutter="16" class="mb-4">
            <a-col :span="12">
              <a-card title="General Information" :bordered="false">
                <a-row :gutter="16">
                  <a-col :span="12">
                    <div class="info-item">
                      <div class="label">Available Balance</div>
                      <div class="value text-primary">{{ generalInfo.availableBalance }}kWh</div>
                    </div>
                    <div class="info-item">
                      <div class="label">Total Generated</div>
                      <div class="value text-primary">{{ generalInfo.totalGenerated }}kWh</div>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="info-item">
                      <div class="label">Transfer Balance</div>
                      <div class="value text-primary">
                        {{ generalInfo.transferBalance }}kWh
                        <a-button type="link" size="small" @click="router.push('/transfer')">
                          Transfer now
                        </a-button>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">Self-Used</div>
                      <div class="value text-primary">{{ generalInfo.selfUsed }}kWh</div>
                    </div>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
            
            <a-col :span="12">
              <a-card title="Cumulative Income" :bordered="false">
                <div class="info-item">
                  <div class="label">Cumulative income</div>
                  <div class="value text-primary">${{ income.cumulative }}</div>
                </div>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <div class="info-item">
                      <div class="label">Monthly income</div>
                      <div class="value text-primary">${{ income.monthly }}</div>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="info-item">
                      <div class="label">Potential income</div>
                      <div class="value text-primary">${{ income.potential }}</div>
                    </div>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
          </a-row>

          
          <a-card 
            title="Recent Transactions" 
            class="mb-4"
            :bordered="true"
          >
            <template #extra>Account Number: xxxxxxxxxx</template>
            <a-list 
              :dataSource="transactions" 
              :loading="loading"
            >
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-row style="width: 100%" :gutter="16">
                    <a-col :span="6">
                      <div class="transaction-type">{{ item.type }}</div>
                      <div class="transaction-date">{{ item.date }}</div>
                    </a-col>
                    <a-col :span="12">
                      <div v-if="item.to">To: {{ item.to }}</div>
                      <div :class="['transaction-status', getStatusClass(item.status)]">
                        Status: {{ item.status }}
                      </div>
                    </a-col>
                    <a-col :span="6" style="text-align: right">
                      <div class="transaction-amount">{{ item.amount }}kWh</div>
                    </a-col>
                  </a-row>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </div>
      </a-layout-content>
      
      <a-layout-footer style="text-align: center">
        Ottawa NM ©2024
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  DashboardOutlined,
  SwapOutlined,
  DownOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['dashboard'])
const username = ref<string>('User')
const loading = ref<boolean>(false)

// 数据结构
interface GeneralInfo {
  availableBalance: number
  transferBalance: number
  totalGenerated: number
  selfUsed: number
}

interface Income {
  cumulative: number
  monthly: number
  potential: number
}

interface Transaction {
  type: string
  date: string
  to?: string
  status: string
  amount: number
}

// 数据状态
const generalInfo = ref<GeneralInfo>({
  availableBalance: 6000,
  transferBalance: 3000,
  totalGenerated: 13000,
  selfUsed: 4000
})

const income = ref<Income>({
  cumulative: 500,
  monthly: 50,
  potential: 140
})

const transactions = ref<Transaction[]>([
  {
    type: 'Generate',
    date: '2024-12-1',
    status: 'Complete',
    amount: 1000
  },
  {
    type: 'Transfer',
    date: '2024-12-1',
    to: 'HydroOttawa',
    status: 'In progress',
    amount: 300
  },
  {
    type: 'Transfer',
    date: '2024-11-15',
    to: 'HydroOttawa',
    status: 'Complete',
    amount: 300
  }
])

// API 调用函数
const fetchDashboardData = async () => {
  try {
    loading.value = true
    // TODO: 实际 API 调用
    /* const response = await fetch('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()
    generalInfo.value = data.generalInfo
    income.value = data.income */
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const fetchTransactions = async () => {
  try {
    loading.value = true
    // TODO: 实际 API 调用
    /* const response = await fetch('/api/transactions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()
    transactions.value = data.transactions */
  } catch (error) {
    console.error('Failed to fetch transactions:', error)
  } finally {
    loading.value = false
  }
}

const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const parsedInfo = JSON.parse(userInfo)
    username.value = parsedInfo.username || 'User'
  }
}

const handleProfile = () => {
  console.log('Navigate to profile page')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/login')
}

const getStatusClass = (status: string) => {
  return {
    'status-complete': status === 'Complete',
    'status-progress': status === 'In progress'
  }
}

onMounted(() => {
  getUserInfo()
  fetchDashboardData()
  fetchTransactions()
})
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.ant-layout-sider {
  background: #001529;
}

.ant-dropdown-link {
  color: rgba(0, 0, 0, 0.85);
}

.dashboard-content {
  padding: 24px;
  background: #fff;
  min-height: 360px;
}

.mb-4 {
  margin-bottom: 16px;
}

.info-item {
  margin-bottom: 16px;
}

.label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 4px;
}

.text-primary {
  color: #1890ff;
}

.transaction-type {
  font-weight: bold;
}

.transaction-date, .transaction-status {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.transaction-amount {
  font-weight: bold;
  color: #1890ff;
}

.status-complete {
  color: #52c41a;
}

.status-progress {
  color: #1890ff;
}
</style>