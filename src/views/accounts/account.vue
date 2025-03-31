<template>
  <Header></Header>
  <a-layout class="content">
    <section class="flex flex-column">
      <div class="flex flex-column flex-auto">
        <div class="surface-section px-4 py-4 my-4 mx-3 lg:py-5 lg:px-6 h-full">
          <div
            class="flex flex-column md:flex-row w-full justify-content-between md:align-items-center"
          >
            <div>
              <h2 class="mt-0 mb-2 text-900 font-medium text-2xl">
                Account Settings
              </h2>
            </div>
          </div>
          <Divider styleClass="my-5"></Divider>

          <div class="p-fluid flex flex-column lg:flex-row">
            <ul
              class="list-none m-0 p-0 flex flex-row lg:flex-column justify-content-between lg:justify-content-start mb-5 lg:mb-0"
            >
              <!-- Profile tab -->
              <li>
                <a
                  v-ripple
                  class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                  :class="{ 'surface-200': activeTab3 === 0 }"
                  @click="(activeTab3 = 0), router.push('/account')"
                >
                  <i
                    class="pi pi-user md:mr-2"
                    :class="{
                      'text-700': activeTab3 === 0,
                      'text-600': activeTab3 !== 0,
                    }"
                  ></i>
                  <span
                    class="font-medium hidden md:block"
                    :class="{
                      'text-800': activeTab3 === 0,
                      'text-700': activeTab3 !== 0,
                    }"
                    >Profile</span
                  >
                </a>
              </li>
              <!-- NM tab -->
              <li>
                <a
                  v-ripple
                  class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                  :class="{ 'surface-200': activeTab3 === 3 }"
                  @click="(activeTab3 = 3), router.push('/account/nm')"
                >
                  <i
                    class="pi pi-sun md:mr-2"
                    :class="{
                      'text-700': activeTab3 === 3,
                      'text-600': activeTab3 !== 3,
                    }"
                  ></i>
                  <span
                    class="font-medium hidden md:block"
                    :class="{
                      'text-800': activeTab3 === 3,
                      'text-700': activeTab3 !== 3,
                    }"
                    >Net Metering</span
                  >
                </a>
              </li>
              <!-- Funds tab -->
              <li>
                <a
                  v-ripple
                  class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                  :class="{ 'surface-200': activeTab3 === 2 }"
                  @click="(activeTab3 = 2), router.push('/account/funds')"
                >
                  <i
                    class="pi pi-palette md:mr-2"
                    :class="{
                      'text-700': activeTab3 === 2,
                      'text-600': activeTab3 !== 2,
                    }"
                  ></i>
                  <span
                    class="font-medium hidden md:block"
                    :class="{
                      'text-800': activeTab3 === 2,
                      'text-700': activeTab3 !== 2,
                    }"
                    >Add Funds</span
                  >
                </a>
              </li>
              <!-- Account setting tab -->
              <li>
                <a
                  v-ripple
                  class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                  :class="{ 'surface-200': activeTab3 === 1 }"
                  @click="(activeTab3 = 1), router.push('/account/setting')"
                >
                  <i
                    class="pi pi-cog md:mr-2"
                    :class="{
                      'text-700': activeTab3 === 1,
                      'text-600': activeTab3 !== 1,
                    }"
                  ></i>
                  <span
                    class="font-medium hidden md:block"
                    :class="{
                      'text-800': activeTab3 === 1,
                      'text-700': activeTab3 !== 1,
                    }"
                    >Account</span
                  >
                </a>
              </li>
            </ul>
            <!-- Dynamically display second level pages -->
            <RouterView></RouterView>
          </div>
        </div>
      </div>
    </section>
    <a-layout-footer class="footer"> Ottawa NM ©2024 </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter, RouterView, RouterLink } from "vue-router";
import { handleUnlogin, loadGlobalAccounts } from "@/utils/common";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import type { User, Transaction } from "@/types";
import { userService } from "@/api/userService";
import { contactsService } from "@/api/contactsService";

// Current logged in user
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const activeTab3 = ref(0);
const visible = ref(false);

const globalAccounts = ref<Array<{ email: string; full_name?: string }>>([]);

// Make sure when loading the page, the activeTab number stay with the current route
const updateActiveTabFromRoute = (path: string) => {
  if (path.includes("/account/profile")) {
    activeTab3.value = 0;
  } else if (path.includes("/account/setting")) {
    activeTab3.value = 1;
  } else if (path.includes("/account/funds")) {
    activeTab3.value = 2;
  } else if (path.includes("/account/nm")) {
    activeTab3.value = 3;
  }
};

watch(
  () => route.path,
  (newPath) => {
    updateActiveTabFromRoute(newPath);
  }
);

onMounted(async () => {
  try {
    updateActiveTabFromRoute(route.path);
    // Make sure user is logged in
    await userService.getUserInfo();
    handleUnlogin(userStore.user, router);
  } catch (error) {
    handleUnlogin(null, router);
  }
});
</script>

<style scoped>
.content {
  min-height: 100vh;
}

.footer {
  text-align: center;
}
</style>
