<!-- Todo: set into BasicLayput -->
<template>
  <a-layout class="layout-container">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @select="handleMenuSelect"
      >
        <a-menu-item key="dashboard">
          <template #icon><dashboard-outlined /></template>
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="transfer">
          <template #icon><swap-outlined /></template>
          <span>Transfer</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header class="header">
        <div class="header-user">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{ username }}
              <down-outlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleLogout">Logout</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      
      
      <a-layout-content class="content">
        <div class="transfer-content">
          <h1>Transfer Excess Energy</h1>
          <h3>Discription: Net metering is a .....</h3>
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
            <a-row class="transfer-row">
              <a-col :span="12">
                <div class="section-label">Select Receiver:</div>
                <a-select
                  v-model:value="selectedReceiver"
                  class="receiver-select"
                  placeholder="Select a receiver"
                  @dropdownVisibleChange="loadGlobalAccounts"
                >
                  <a-select-option 
                    v-for="account in globalAccounts" 
                    :key="account.email" 
                    :value="account.email"
                  >
                    {{ account.full_name || account.email }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
 
            <!-- Transfer Amount Section -->
            <a-row class="transfer-row">
              <a-col :span="12">
                <div class="section-label">Amount to Transfer (kWh):</div>
                <a-input-number
                  v-model:value="transferAmount"
                  :min="0"
                  :max="availableBalance"
                  class="amount-input"
                />
                <a-slider
                  v-model:value="transferAmount"
                  :min="0"
                  :max="availableBalance"
                  class="amount-slider"
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
              <a-button class="cancel-button" @click="handleCancel">
                Cancel
              </a-button>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      
      <a-layout-footer class="footer">
        Ottawa NM ©2024
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
 
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  DashboardOutlined,
  SwapOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
 
const URL = "http://localhost:8080";
const router = useRouter();


const collapsed = ref<boolean>(false);
const selectedKeys = ref(['transfer']);
const username = ref('');
const currentUserEmail = ref('');
const loading = ref(false);
 

const availableBalance = ref(0);
const transferBalance = ref(0);
const transferAmount = ref(0);
const ratePerKWh = 0.5;


const selectedReceiver = ref('');
const globalAccounts = ref<Array<{ email: string; full_name?: string }>>([]);
 

const estimatedEarnings = computed(() => {
  return (transferAmount.value * ratePerKWh).toFixed(2);
});
 

const handleMenuSelect = (data: { key: string }) => {
  router.push('/' + data.key);
};

// Fetch loadGlobalAcc
const loadGlobalAccounts = async () => {
  try {
    const response = await fetch(URL + "/api/user/globalAccounts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error('Failed to load global accounts');
    }

    const accounts = await response.json();
    globalAccounts.value = accounts.filter((account: any) => 
      account.email !== currentUserEmail.value
    );
  } catch (error) {
    console.error('Failed to load global accounts:', error);
    message.error('Failed to load available receivers');
  }
};

// Fetch user info
const fetchUserInfo = async () => {
  try {
    const response = await fetch(URL + "/api/user/info", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
 
    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status);
    }
 
    const userInfo = await response.json();
    
    if (userInfo.full_name) {
      username.value = userInfo.full_name;
    } else {
      username.value = 'User';
    }
    currentUserEmail.value = userInfo.email;

    if (userInfo.account.availableBalance) {
      availableBalance.value = Number(userInfo.account.availableBalance);
    } else {
      availableBalance.value = 0;
    }

    if (userInfo.account.transferedBalance) {
      transferBalance.value = Number(userInfo.account.transferedBalance);
    } else {
      transferBalance.value = 0;
    }
 
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    message.error('Failed to load user information');
  }
};

// Handle transfer
const handleTransfer = async () => {
  if (!selectedReceiver.value) {
    message.warning('Please select a receiver');
    return;
  }

  if (transferAmount.value <= 0) {
    message.warning('Please enter a valid amount');
    return;
  }

  if (transferAmount.value > availableBalance.value) {
    message.warning('Transfer amount cannot exceed available balance');
    return;
  }
 
  try {
    loading.value = true;
    const requestBody = {
      amount: transferAmount.value,
      fromEmail: currentUserEmail.value,
      toEmail: selectedReceiver.value
    };

    const response = await fetch(URL + "/api/transfer/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody)
    });
 
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      console.log("Transaction succeed!");
      message.success('Transfer successful');
    }
    router.push('/dashboard');
  } catch (error) {
    console.error("Fetch error:", error);
    message.error('Transfer failed. Please try again.');
  } finally {
    loading.value = false;
  }
};

// Handle cancel
const handleCancel = () => {
  router.push('/dashboard');
};

// Handle logout
const handleLogout = async () => {
  try {
    const response = await fetch(URL + "/api/logout", {
      method: "GET",
      credentials: "include",
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
 
    localStorage.removeItem('token');
    window.location.href = "/";
  } catch (error) {
    console.error('Logout failed:', error);
    message.error('Logout failed. Please try again.');
    window.location.href = "/";
  }
};
 

onMounted(() => {
  fetchUserInfo();
  loadGlobalAccounts();
});
</script>
 
<style scoped>

.layout-container {
  min-height: 100vh;
}


.header {
  background: #fff;
  padding: 0;
}

.header-user {
  float: right;
  margin-right: 24px;
}

.ant-dropdown-link {
  color: rgba(0, 0, 0, 0.85);
}


.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}


.content {
  margin: 24px 16px 0;
}

.transfer-content {
  padding: 24px;
  background: #fff;
  min-height: 360px;
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

.transfer-row {
  margin-bottom: 24px;
}

.section-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.receiver-select {
  width: 100%;
}

.amount-input {
  width: 200px;
}

.amount-slider {
  margin-top: 16px;
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

.cancel-button {
  margin-left: 8px;
}


.footer {
  text-align: center;
}
</style>