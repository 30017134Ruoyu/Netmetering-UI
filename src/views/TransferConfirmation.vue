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
          <div class="confirmation-content">
            <a-result
              status="success"
              title="Transfer Successful!"
              sub-title="Your energy transfer has been processed successfully."
            >
              <template #extra>
                <a-card title="Transfer Details" class="confirmation-card">
                  <a-descriptions bordered :column="1">
                    <a-descriptions-item label="Receiver">
                      {{ receiverName || receiverEmail }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Receiver Email">
                      {{ receiverEmail }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Amount Transferred">
                      {{ amount }} kWh
                    </a-descriptions-item>
                    <a-descriptions-item label="Remaining Balance">
                      {{ remainingBalance }} kWh
                    </a-descriptions-item>
                    <a-descriptions-item label="Transaction Date">
                      {{ currentDateTime }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
                
                <div class="button-group">
                  <a-button type="primary" @click="handleBackToDashboard">
                    Return to Dashboard
                  </a-button>
                </div>
              </template>
            </a-result>
          </div>
        </a-layout-content>
        
        <a-layout-footer class="footer">
          Ottawa NM ©2024
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>
   
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import {
    DashboardOutlined,
    SwapOutlined,
    DownOutlined
  } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
   
  const URL = "http://localhost:8080";
  const router = useRouter();
  const route = useRoute();
  
  const collapsed = ref<boolean>(false);
  const selectedKeys = ref(['transfer']);
  const username = ref('User');
  
  // 转账数据
  const receiverName = ref('');
  const receiverEmail = ref('');
  const amount = ref(0);
  const remainingBalance = ref(0);
  const currentDateTime = ref(new Date().toLocaleString());
  
  const handleMenuSelect = (data: { key: string }) => {
    router.push('/' + data.key);
  };
  
  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };
  

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
  
  const fetchTransferInfo = async () => {
    try {
      const userResponse = await fetch(URL + "/api/user/info", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
   
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user information');
      }
   
      const userInfo = await userResponse.json();
      
      if (userInfo.full_name) {
        username.value = userInfo.full_name;
      }
  
      // 2. 获取最近的转账信息
      // 尝试从localStorage获取转账数据
      const transferDataJSON = localStorage.getItem('lastTransferData');
      if (transferDataJSON) {
        try {
          const transferData = JSON.parse(transferDataJSON);
          receiverEmail.value = transferData.toEmail || '';
          receiverName.value = transferData.receiverName || '';
          amount.value = transferData.amount || 0;
          
          // 如果转账数据中有剩余余额，使用它
          if (transferData.remainingBalance) {
            remainingBalance.value = transferData.remainingBalance;
          } 
          // 否则使用用户信息中的可用余额
          else if (userInfo.account && userInfo.account.availableBalance) {
            remainingBalance.value = Number(userInfo.account.availableBalance);
          }
          
          // 使用转账数据中的时间，如果有的话
          if (transferData.timestamp) {
            currentDateTime.value = new Date(transferData.timestamp).toLocaleString();
          }
        } catch (error) {
          console.error('Failed to parse transfer data from localStorage:', error);
        }
      }
      
      // 如果还没有数据，尝试从路由参数获取
      if (!receiverEmail.value && route.query) {
        receiverEmail.value = route.query.receiverEmail as string || '';
        receiverName.value = route.query.receiverName as string || '';
        amount.value = Number(route.query.amount) || 0;
        remainingBalance.value = Number(route.query.remainingBalance) || 0;
        
        if (route.query.timestamp) {
          currentDateTime.value = new Date(route.query.timestamp as string).toLocaleString();
        }
      }
      
      // 如果仍然没有数据，显示错误消息
      if (!receiverEmail.value) {
        message.warning('Transfer information not available');
      }
      
    } catch (error) {
      console.error('Failed to fetch transfer information:', error);
      message.error('Failed to load transfer details');
    }
  };
  
  onMounted(() => {
    fetchTransferInfo();
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
  
  .confirmation-content {
    padding: 24px;
    background: #fff;
    min-height: 360px;
  }
  
  .confirmation-card {
    max-width: 600px;
    margin: 0 auto 24px;
  }
  
  .button-group {
    margin-top: 24px;
    text-align: center;
  }
  
  .footer {
    text-align: center;
  }
  </style>