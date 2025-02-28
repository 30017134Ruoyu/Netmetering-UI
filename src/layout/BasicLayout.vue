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
    </a-layout>
</a-layout>

</template>

<script>
           
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import {
    DashboardOutlined,
    SwapOutlined,
    DownOutlined
    } from '@ant-design/icons-vue';    

    const collapsed = ref<boolean>(false);

</script>

<style>

.layout {
    min-height: 100vh;
  }
  
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  /* 头部样式 */
  .header {
    background: #fff;
    padding: 0;
  }
  
  .header__user {
    float: right;
    margin-right: 24px;
  }
  
  .header__dropdown {
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
  }
</style>
