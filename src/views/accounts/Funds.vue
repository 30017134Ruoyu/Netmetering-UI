<template>
  <div class="content surface-card p-5 shadow-2 border-round flex-auto xl:ml-5">
    <div>
      <p class="text-2xl text-900">Add funds to your account</p>
    </div>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div class="grid justify-content-around">
        <div class="col-12 lg:col-5 p-3">
          <div class="shadow-2 surface-card p-3" style="border-radius: 12px">
            <div class="flex align-items-center justify-content-between">
              <div>
                <span class="text-3xl text-900 font-bold"
                  >{{ userStore.user?.account?.energyBalance }} kWh</span
                >
                <p class="mt-2 mb-0 text-600 text-xl">Energy Balance</p>
              </div>
              <div>
                <img
                  src="/images/blocks/illustration/stats-illustration-5.svg"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 lg:col-5 p-3">
          <div class="shadow-2 surface-card p-3" style="border-radius: 12px">
            <div class="flex align-items-center justify-content-between">
              <div>
                <span class="text-3xl text-900 font-bold"
                  >{{ userStore.user?.account?.availableBalance }} kWh</span
                >
                <p class="mt-2 mb-0 text-600 text-xl">Avaliable Balance</p>
              </div>
              <div>
                <img
                  src="/images/blocks/illustration/stats-illustration-4.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-center mt-5 mb-3">
      Enter the energy amount you wish to deposit
    </h1>
    <div class="flex flex-column mt-3 align-content-center mx-auto w-3">
      <InputGroup class="mb-2">
        <InputGroupAddon>⚡️</InputGroupAddon>
        <InputNumber
          placeholder="Energy"
          v-model="energyAmount"
          :maxFractionDigits="5"
        />
        <InputGroupAddon>kWh</InputGroupAddon>
      </InputGroup>
      <div class="card flex justify-content-center mt-3">
        <!-- Confirm dialog -->
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <Button
          class="w-5 text-green-500"
          type="button"
          label="Add"
          icon="pi pi-wallet"
          outlined
          @click="openDialog"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { handleUnlogin, loadGlobalAccounts } from "@/utils/common";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import type { User, Transaction } from "@/types";
import { userService } from "@/api/userService";
import { contactsService } from "@/api/contactsService";
import { useConfirm } from "primevue/useconfirm";

const fetchUserInfo = inject<() => Promise<void>>("fetchUserInfo");

// Current logged in user
const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const energyAmount = ref(0);

const openDialog = () => {
  if (energyAmount.value === 0 || energyAmount.value <= 0) {
    toast.add({
      severity: "warn",
      summary: "Incorrect format",
      detail: "Please enter a valid energy amount",
      life: 3000,
    });
    return;
  }
  confirm.require({
    message: "Are you sure you want to deposit?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Cancel",
    acceptLabel: "Confirm",
    acceptClass: "p-button-outlined text-green-500",
    accept: () => {
      deposit(energyAmount.value.toString());
    },
  });
};

const deposit = async (amount: string) => {
  try {
    const response = await userService.deposit(amount);
    if (response.status === 200) {
      energyAmount.value = 0;
      if (fetchUserInfo) {
        fetchUserInfo();
      }
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "You have deposit successfully!",
        life: 3000,
      });
    }
  } catch (error: any) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: error.response.message,
      life: 3000,
    });
  }
};
</script>

<style scoped>
.content {
  min-height: 80vh;
}
</style>
