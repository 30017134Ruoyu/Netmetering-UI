<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { provide, onMounted } from "vue";
import type { User } from "@/types";
import { useUserStore } from "@/stores/user";
import { userService } from "@/api/userService";

// Current logged in user
const userStore = useUserStore();

// Fetch DashboardInfo
const fetchUserInfo = async () => {
  try {
    const userInfo = await userService.getUserInfo();

    console.log(userInfo);

    userStore.setUser(userInfo.data as User);
  } catch (error) {
    console.error("Failed to fetch dashboard info:", error);
  }
};

onMounted(() => {
  fetchUserInfo();
});

provide("fetchUserInfo", fetchUserInfo);
</script>