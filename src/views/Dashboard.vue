<template>
  <Header></Header>
  <a-layout class="layout">
    <a-layout>
      <!-- Content -->
      <a-layout-content class="content">
        <Toast />
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

          <div class="surface-card shadow-1 border-round p-4">
            <div class="flex justify-content-between align-items-center mb-5">
              <span class="text-xl text-900 font-medium"
                >Recent Transactions</span
              >
            </div>

            <!-- 
            Color used to indicate the amount transfered

            Green: <= 2500 kWh
            Pink: between 2500 and 5000 kWh
            Gold: > 5000 kWh
           -->
            <ul v-if="haveTransactions" class="list-none p-0 m-0">
              <li
                v-for="(item, index) in transactionList"
                :key="item.fromAccountId"
                class="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3"
                :class="getBgBorderAmountClasses(item.amount)"
                style="border-radius: 10px"
              >
                <div>
                  <div>
                    <span
                      class="inline-flex justify-content-center align-items-center w-2rem h-2rem border-circle border-1"
                      :class="getBorderAmountClasses(item.amount)"
                    >
                      <i
                        class="pi pi-file"
                        :class="getTextAmountClasses(item.amount)"
                      ></i>
                    </span>
                    <span
                      class="font-bold ml-2"
                      :class="getTextAmountClasses(item.amount)"
                      >{{ item.userDTO.full_name }}</span
                    >
                  </div>
                  <p
                    class="mt-2 mb-0"
                    :class="getTextAmountClasses(item.amount)"
                  >
                    On
                    <span class="font-medium">{{
                      new Date(item.dateTime).toLocaleString()
                    }}</span>
                  </p>
                </div>
                <div
                  class="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0"
                >
                  <span
                    class="font-bold text-sm py-1 px-2"
                    :class="getBgTextAmountClasses(item.amount)"
                    style="border-radius: 10px"
                    >{{ getPhrase(item.amount) }}</span
                  >
                  <div class="text-right ml-3">
                    <span
                      class="font-bold"
                      :class="getTextAmountClasses(item.amount)"
                      >{{ item.amount }}</span
                    >
                    <p
                      class="mt-1 mb-0"
                      :class="getTextAmountClasses(item.amount)"
                    >
                      kWh
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="flex justify-content-center">
              <h1 v-if="!haveTransactions">No Transactions yet</h1>
            </div>
          </div>
        </div>
      </a-layout-content>

      <a-layout-footer class="footer"> Ottawa NM ©2024 </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { handleUnlogin } from "@/utils/common";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import type { User, Transaction } from "@/types";
import { userService } from "@/api/userService";

const URL = "http://localhost:8080";
const router = useRouter();
const toast = useToast();
const transactionList = ref<Transaction[]>([]);
const haveTransactions = ref(false);

// Current logged in user
const userStore = useUserStore();

// Get the phrase like pitch in, laviash
const getPhrase = (amount: number) => {
  if (amount <= 2500) {
    return "pitch in";
  } else if (amount > 2500 && amount <= 5000) {
    return "generous";
  } else if (amount > 5000) {
    return "lavish";
  }
  return "";
};

// Get style classes for the transactions
const getBgBorderAmountClasses = (amount: number) => {
  if (amount <= 2500) {
    return ["bg-green-50", "border-green-500"];
  } else if (amount > 2500 && amount <= 5000) {
    return ["bg-pink-50", "border-pink-500"];
  } else if (amount > 5000) {
    return ["bg-yellow-50", "border-yellow-500"];
  }
  return [];
};

const getBgTextAmountClasses = (amount: number) => {
  if (amount <= 2500) {
    return ["bg-green-400", "text-green-900"];
  } else if (amount > 2500 && amount <= 5000) {
    return ["bg-pink-400", "text-pink-50"];
  } else if (amount > 5000) {
    return ["bg-yellow-400", "text-yellow-900"];
  }
  return [];
};

const getBorderAmountClasses = (amount: number) => {
  if (amount <= 2500) {
    return "border-green-200";
  } else if (amount > 2500 && amount <= 5000) {
    return "border-pink-200";
  } else if (amount > 5000) {
    return "border-yellow-200";
  }
  return [];
};

const getTextAmountClasses = (amount: number) => {
  if (amount <= 2500) {
    return "text-green-700";
  } else if (amount > 2500 && amount <= 5000) {
    return "text-pink-500";
  } else if (amount > 5000) {
    return "text-yellow-700";
  }
  return [];
};

const handleMenuClick = (route: string) => {
  router.push(`/${route}`);
};

const getTransactions = async (user: User) => {
  try {
    const response = await userService.getTransactionById(user);
    console.log(response);
    transactionList.value = response.data;
    if (transactionList.value.length > 0) {
      haveTransactions.value = true;
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Fail to login",
      detail: error.response.data,
      life: 2000,
    });
  }
};

onMounted(async () => {
  try {
    await userService.getUserInfo();

    if (userStore.user) {
      console.log(userStore.user);
      getTransactions(userStore.user);
    } else {
      toast.add({
        severity: "error",
        summary: "Fail to login",
        detail: "User is null",
        life: 2000,
      });
    }
    handleUnlogin(userStore.user, router);
  } catch (error) {
    console.error("getUserInfo failed:", error);
    handleUnlogin(null, router);
  }
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
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

.transactions__account {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.footer {
  text-align: center;
}
</style>
