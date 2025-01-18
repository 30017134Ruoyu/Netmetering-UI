<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @select="handleMenuSelect"
      >
        <a-menu-item key="dashboard">
          <template #icon>
            <dashboard-outlined />
          </template>
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="transfer">
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
                  <a @click="handleProfile">Profile</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleLogout">Logout</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      
      <a-layout-content style="margin: 24px 16px 0">
        <div class="transfer-content">
          <h1>Transfer Excess Energy</h1>
          <p class="description">
            By transferring excess electricity to the grid, you can receive a credit or cash benefit.
          </p>

          
          <a-row :gutter="16" class="balance-section">
            <a-col :span="12">
              <a-card title="Available Balance">
                <div class="balance-amount">{{ availableBalance }} kWh</div>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card title="Transfer Balance">
                <div class="balance-amount">{{ transferBalance }} kWh</div>
              </a-card>
            </a-col>
          </a-row>

          
          <a-card title="Transfer Energy" class="transfer-section">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="section-label">Enter Amount to Transfer (kWh):</div>
                <a-input-number
                  v-model:value="transferAmount"
                  :min="0"
                  :max="availableBalance"
                  style="width: 200px"
                  @change="handleAmountChange"
                />
                <a-slider
                  v-model:value="transferAmount"
                  :min="0"
                  :max="availableBalance"
                  style="margin-top: 16px"
                />
              </a-col>
              <a-col :span="12">
                <div class="section-label">Estimated Earnings ($):</div>
                <div class="estimated-earnings">${{ estimatedEarnings }}</div>
              </a-col>
            </a-row>
            
            <div class="button-group">
              <a-button type="primary" @click="handleTransfer" :loading="loading">
                Transfer
              </a-button>
              <a-button @click="handleCancel" style="margin-left: 8px">
                Cancel
              </a-button>
            </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  DashboardOutlined,
  SwapOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['transfer'])
const username = ref<string>('User')
const loading = ref<boolean>(false)


const availableBalance = ref(6000)
const transferBalance = ref(3000)
const transferAmount = ref(300)
const ratePerKWh = 0.5 


const estimatedEarnings = computed(() => {
  return (transferAmount.value * ratePerKWh).toFixed(2)
})


const handleMenuSelect = ({ key }: { key: string }) => {
  router.push(`/${key}`)
}


const handleAmountChange = (value: number) => {
  if (value > availableBalance.value) {
    message.warning('Amount cannot exceed available balance')
    transferAmount.value = availableBalance.value
  }
}


const handleTransfer = async () => {
  if (transferAmount.value <= 0) {
    message.warning('Please enter a valid amount')
    return
  }

  try {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    message.success('Transfer successful!')
    router.push('/dashboard')
  } catch (error) {
    message.error('Transfer failed. Please try again.')
  } finally {
    loading.value = false
  }
}


const handleCancel = () => {
  router.push('/dashboard')
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

onMounted(() => {
  getUserInfo()
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

.transfer-content {
  padding: 24px;
  background: #fff;
  min-height: 360px;
}

.description {
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.65);
}

.balance-section {
  margin-bottom: 24px;
}

.balance-amount {
  font-size: 28px;
  font-weight: bold;
  color: #1890ff;
}

.transfer-section {
  background: #fafafa;
}

.section-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.estimated-earnings {
  font-size: 28px;
  font-weight: bold;
  color: #52c41a;
}

.button-group {
  margin-top: 24px;
  text-align: right;
}
</style>