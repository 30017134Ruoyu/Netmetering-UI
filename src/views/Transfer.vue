<!-- Todo: set into BasicLayput -->
<template>
  <Header></Header>
  <a-layout class="layout-container">
    <a-layout>
      <a-layout-content class="content">
        <div class="transfer-content">
          <div class="flex justify-content-between">
            <h1 class="text-3xl">Account Overview</h1>
            <Button
              label="Dashboard"
              severity="warning"
              outlined
              class="text-yellow-500"
              @click="router.push('/dashboard')"
            />
          </div>
          <div class="px-4 py-5 md:px-6 lg:px-8 text-xl">
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                    <div>
                      <span class="block text-500 font-medium mb-3"
                        >Total Energy</span
                      >
                      <div class="text-900 font-medium text-xl">
                        {{ userStore.user?.account?.energyBalance }} kWh
                      </div>
                    </div>
                    <div
                      class="flex align-items-center justify-content-center bg-blue-100 border-round"
                      style="width: 2.5rem; height: 2.5rem"
                    >
                      <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                  </div>
                  <span class="text-green-500 font-medium">24 new </span>
                  <span class="text-500">since last visit</span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                    <div>
                      <span class="block text-500 font-medium mb-3"
                        >Avaliable balance</span
                      >
                      <div class="text-900 font-medium text-xl">
                        {{ userStore.user?.account?.availableBalance }} kWh
                      </div>
                    </div>
                    <div
                      class="flex align-items-center justify-content-center bg-orange-100 border-round"
                      style="width: 2.5rem; height: 2.5rem"
                    >
                      <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                    </div>
                  </div>
                  <span class="text-green-500 font-medium">%52+ </span>
                  <span class="text-500">since last week</span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                    <div>
                      <span class="block text-500 font-medium mb-3"
                        >Cumulative Income</span
                      >
                      <div class="text-900 font-medium text-xl">
                        {{ userStore.user?.account?.cumulativeIncome }}
                      </div>
                    </div>
                    <div
                      class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                      style="width: 2.5rem; height: 2.5rem"
                    >
                      <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                  </div>
                  <span class="text-green-500 font-medium">520 </span>
                  <span class="text-500">newly registered</span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                    <div>
                      <span class="block text-500 font-medium mb-3"
                        >Comments</span
                      >
                      <div class="text-900 font-medium text-xl">152 Unread</div>
                    </div>
                    <div
                      class="flex align-items-center justify-content-center bg-purple-100 border-round"
                      style="width: 2.5rem; height: 2.5rem"
                    >
                      <i class="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                  </div>
                  <span class="text-green-500 font-medium">85 </span>
                  <span class="text-500">responded</span>
                </div>
              </div>
            </div>
          </div>

          <!-- <a-row :gutter="16" class="balance-section">
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
          </a-row> -->

          <a-card title="Transfer Energy" class="transfer-section">
            <a-row class="transfer-row">
              <a-col :span="12">
                <div class="section-label font-bold">Select Receiver:</div>
                <Dropdown
                  v-model="selectedReceiver"
                  :options="globalAccounts"
                  optionLabel="full_name"
                  placeholder="Select an account"
                  class="w-full"
                />
              </a-col>
            </a-row>
            <Divider />
            <!-- Transfer Amount Section -->
            <div class="transfer-row">
              <div class="section-label text-xl">Amount to Transfer (kWh):</div>
              <div class="grid">
                <div class="col-6">
                  <div class="flex-auto">
                    <label for="energy-amount" class="block mb-2">
                      <span class="font-bold">Energy Amount</span> (Hit enter to
                      get estimited earning)
                    </label>
                    <InputNumber
                      v-model="transferAmount"
                      inputId="energy-amount"
                      :maxFractionDigits="5"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="section-label font-bold">
                    Estimated Earnings ($):
                  </div>
                  <div class="estimated-earnings">${{ estimatedEarnings }}</div>
                </div>
              </div>
            </div>

            <div class="button-group">
              <Toast />
              <ConfirmDialog></ConfirmDialog>
              <div class="card flex flex-wrap gap-2 justify-content-center">
                <Button
                  @click="confirm1()"
                  label="Transfer"
                  severity="success"
                  text
                  raised
                  outlined
                  :loading="loading"
                  class="text-green-500 mx-4"
                />
                <Button
                  @click="clear()"
                  label="Clear"
                  severity="danger"
                  text
                  raised
                  outlined
                  class="text-red-500 mx-4"
                />
              </div>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer class="footer"> Ottawa NM ©2024 </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/user";

const fetchUserInfo = inject<() => Promise<void>>("fetchUserInfo");

// Current logged in user
const userStore = useUserStore();

const URL = "http://localhost:8080";
const router = useRouter();
const loading = ref(false);
const ratePerKWh = 0.5;

let selectedReceiver = ref<{ email: string; full_name: string } | null>(null);
const globalAccounts = ref<Array<{ email: string; full_name?: string }>>([]);

// Select value will be each value in this array
const transferAmount = ref(0);

const confirm = useConfirm();
const toast = useToast();

watch(selectedReceiver, (newValue, _) => {
  if (newValue) {
    console.log(newValue);
    console.log(
      "Selected user:",
      newValue.full_name,
      " Email:",
      newValue.email
    );
  } else {
    console.log("No user chosed");
  }
});

const confirm1 = () => {
  if (!selectedReceiver.value) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: "Please select a receiver",
      life: 3000,
    });
    return;
  }

  if (transferAmount.value <= 0) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: "Please enter a valid amount",
      life: 3000,
    });
    return;
  }
  console.log(userStore.user);
  if (
    transferAmount.value > (userStore?.user?.account?.availableBalance ?? 0)
  ) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: "Transfer amount cannot exceed available balance",
      life: 3000,
    });
    return;
  }
  confirm.require({
    message: `Transfer to: ${selectedReceiver?.value?.full_name}
    , email: ${selectedReceiver?.value?.email}, amount: ${transferAmount?.value} kWh?`,
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptLabel: "Confirm",
    accept: () => {
      handleTransfer();
    },
  });
};

const clear = () => {
  selectedReceiver.value = null;
  transferAmount.value = 0;
};

const estimatedEarnings = computed(() => {
  return (transferAmount.value * ratePerKWh).toFixed(2);
});

// Fetch loadGlobalAcc
const loadGlobalAccounts = async () => {
  try {
    const response = await fetch(URL + "/api/user/globalAccounts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to load global accounts");
    }

    const accounts = await response.json();
    globalAccounts.value = accounts.filter(
      (account: any) => account.email !== userStore?.user?.email
    );

    globalAccounts.value.forEach((account) => {
      if (account.full_name === "Rachael Wilson") {
        account.full_name = "Food Bank";
      } else if (account.full_name === "Weston Galen") {
        account.full_name = "Lablows";
      }
    });
  } catch (error) {
    console.error("Failed to load global accounts:", error);
    message.error("Failed to load available receivers");
  }
};

// Handle transfer
const handleTransfer = async () => {
  try {
    loading.value = true;
    const requestBody = {
      amount: transferAmount.value,
      fromEmail: userStore?.user?.email,
      toEmail: selectedReceiver.value?.email,
    };
    const response = await fetch(URL + "/api/transfer/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      if (fetchUserInfo) {
        fetchUserInfo();
      }
      const message =
        "You've transfered " +
        transferAmount?.value +
        " kWh to " +
        selectedReceiver?.value?.full_name;
      toast.add({
        severity: "success",
        summary: "Confirmed",
        detail: message,
        life: 3000,
      });
      selectedReceiver.value = null;
      transferAmount.value = 0;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

// Handle logout

onMounted(() => {
  loadGlobalAccounts();
});
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
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

.footer {
  text-align: center;
}
</style>
