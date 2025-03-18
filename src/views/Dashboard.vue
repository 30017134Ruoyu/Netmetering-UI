<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="dashboard" @click="handleMenuClick('dashboard')">
          <template #icon>
            <dashboard-outlined />
          </template>
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="transfer" @click="handleMenuClick('transfer')">
          <template #icon>
            <swap-outlined />
          </template>
          <span>Transfer</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- Header -->
      <a-layout-header class="header">
        <div class="header__user">
          <a-dropdown>
            <a class="header__dropdown">
              {{ userStore.user?.full_name }}
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

      <!-- Content -->
      <a-layout-content class="content">
        <div class="content__main">
          <a-row :gutter="16" class="overview">
            <a-col :span="12">
              <a-card title="General Information" :bordered="false">
                <a-row :gutter="16">
                  <a-col :span="12">
                    <div class="overview__item">
                      <div class="overview__label">Available Balance</div>
                      <div class="overview__value">
                        {{ userStore.user?.account?.availableBalance }}kWh
                      </div>
                    </div>
                    <div class="overview__item">
                      <div class="overview__label">Total Generated</div>
                      <div class="overview__value">
                        {{ userStore.user?.account?.energyBalance }}kWh
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="overview__item">
                      <div class="overview__label">Transfer Balance</div>
                      <div class="overview__value">
                        {{ userStore.user?.account?.transferedBalance }}kWh
                        <a-button
                          type="link"
                          size="small"
                          @click="handleMenuClick('transfer')"
                        >
                          Transfer now
                        </a-button>
                      </div>
                    </div>
                    <div class="overview__item">
                      <div class="overview__label">Self-Used</div>
                      <div class="overview__value">
                        {{ userStore.user?.account?.consumedBalance }}kWh
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>

            <a-col :span="12">
              <a-card title="Cumulative Income" :bordered="false">
                <div class="overview__item">
                  <div class="overview__label">Cumulative income</div>
                  <div class="overview__value">
                    ${{ userStore.user?.account?.cumulativeIncome }}
                  </div>
                </div>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <div class="overview__item">
                      <div class="overview__label">Monthly income</div>
                      <div class="overview__value">
                        ${{ userStore.user?.account?.averageIncome }}
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="overview__item">
                      <div class="overview__label">Potential income</div>
                      <div class="overview__value">
                        ${{ userStore.user?.account?.averageIncome }}
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
          </a-row>

          <a-card
            title="Recent Transactions"
            class="transactions"
            :bordered="true"
          >
            <template #extra>
              <span class="transactions__account"
                >Account: {{ userStore.user?.email }}</span
              >
            </template>
            <a-list :dataSource="transactions" :loading="loading">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-row class="transactions__row">
                    <a-col :span="6">
                      <div class="transactions__type">{{ item.type }}</div>
                      <div class="transactions__date">{{ item.date }}</div>
                    </a-col>
                    <a-col :span="12">
                      <div v-if="item.to" class="transactions__receiver">
                        To: {{ item.to }}
                      </div>
                      <div
                        class="transactions__status"
                        :class="{
                          'transactions__status--completed':
                            item.status === 'Complete',
                          'transactions__status--processing':
                            item.status !== 'Complete',
                        }"
                      >
                        Status: {{ item.status }}
                      </div>
                    </a-col>
                    <a-col :span="6">
                      <div class="transactions__amount">
                        {{ item.amount }}kWh
                      </div>
                    </a-col>
                  </a-row>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </div>
      </a-layout-content>

      <a-layout-footer class="footer"> Ottawa NM ©2024 </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  DashboardOutlined,
  SwapOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { User } from "@/types";
import { useUserStore } from "@/stores/user";
import { userService } from "@/api/userService";

const URL = "http://localhost:8080";
const router = useRouter();

const collapsed = ref<boolean>(false);
const selectedKeys = ref(["dashboard"]);
const loading = ref(false);

// Current logged in user
const userStore = useUserStore();

//next TODO: GET transactions by calling api

const transactions = ref([
  {
    type: "Generate",
    date: "2024-12-1",
    status: "Complete",
    amount: 1000,
  },
  {
    type: "Transfer",
    date: "2024-12-1",
    to: "HydroOttawa",
    status: "In progress",
    amount: 300,
  },
  {
    type: "Transfer",
    date: "2024-11-15",
    to: "HydroOttawa",
    status: "Complete",
    amount: 300,
  },
]);

const handleMenuClick = (route: string) => {
  router.push(`/${route}`);
};

// Fetch DashboardInfo
const fetchUserInfo = async () => {
  try {
    loading.value = true;

    const userInfo = await userService.getUserInfo();

    console.log(userInfo);

    userStore.setUser(userInfo.data as User);
  } catch (error) {
    console.error("Failed to fetch dashboard info:", error);
    message.error("Failed to load user information");
  } finally {
    loading.value = false;
  }
};

// Fetch logout
const handleLogout = async () => {
  try {
    const response = await fetch(URL + "/api/logout", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
    message.error("Logout failed. Please try again.");
    window.location.href = "/";
  }
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

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

.content {
  margin: 24px 16px 0;
}

.content__main {
  padding: 24px;
  background: #fff;
  min-height: 360px;
}

.overview {
  margin-bottom: 24px;
}

.overview__item {
  margin-bottom: 16px;
}

.overview__label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.overview__value {
  color: #1890ff;
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
}

.transactions {
  margin-bottom: 24px;
}

.transactions__account {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.transactions__row {
  width: 100%;
}

.transactions__type {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}

.transactions__date {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.transactions__receiver {
  color: rgba(0, 0, 0, 0.85);
}

.transactions__status {
  font-size: 14px;
}

.transactions__status--completed {
  color: #52c41a;
}

.transactions__status--processing {
  color: #1890ff;
}

.transactions__amount {
  text-align: right;
  font-weight: bold;
  color: #1890ff;
}

.footer {
  text-align: center;
}
</style>
