<template>
  <div class="flex align-items-center justify-content-between">
    <SideBar class="ml-8 my-6" :username="username"></SideBar>
    <Toast />
    <ul
      class="list-none p-0 m-0 mr-6 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 border-indigo-400 lg:border-top-none"
    >
      <li>
        <a
          v-ripple
          class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-cyan-500 hover:text-indigo-50 hover:bg-cyan-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
        >
          <i class="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
          <span class="block lg:hidden font-medium">Inbox</span>
        </a>
      </li>
      <li>
        <a
          v-ripple
          class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-cyan-500 hover:text-indigo-50 hover:bg-cyan-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
        >
          <i class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"></i>
          <span class="block lg:hidden font-medium">Notifications</span>
        </a>
      </li>
      <!-- Profile -->
      <li
        ref="dropdownRef"
        class="relative border-top-0 border-indigo-400 lg:border-top-none"
      >
        <a
          v-ripple
          @click.stop="toggleDropdown"
          class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center hover:bg-cyan-300 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'fadein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'fadeout',
          }"
        >
          <img
            src="/images/blocks/avatars/circle/avatar-f-1.png"
            class="mr-3 lg:mr-0"
            style="width: 32px; height: 32px"
          />
          <div class="block">
            <span class="text-indigo-0 font-medium text-sm ml-3">{{
              username
            }}</span>
          </div>
        </a>
        <ul
          class="hidden z-5 absolute list-none p-2 m-0 top-full right-0 w-18rem bg-white shadow-lg border border-gray-200 origin-top animation-duration-150"
        >
          <div
            class="border-top-1 surface-border my-3"
            style="height: 1px"
          ></div>
          <li>
            <a
              v-ripple
              class="flex align-items-center cursor-pointer p-3 text-700 hover:surface-100 border-round transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-user mr-2"></i>
              <span class="font-medium">Profile</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              class="flex align-items-center cursor-pointer p-3 text-700 hover:surface-100 border-round transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-cog mr-2"></i>
              <span class="font-medium">Settings</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              @click="router.push('/login')"
              class="flex align-items-center cursor-pointer p-3 text-700 hover:surface-100 border-round transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-plus mr-2"></i>
              <span class="font-medium">Sign in</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              @click="signout()"
              class="flex align-items-center cursor-pointer p-3 text-700 hover:surface-100 border-round transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-sign-out mr-2"></i>
              <span class="font-medium">Sign Out</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { authService } from "@/api/authService";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const fetchUserInfo = inject<() => Promise<void>>("fetchUserInfo");

// Current logged in user
const userStore = useUserStore();

const router = useRouter();

const username = computed(() => userStore.user?.full_name || "Guest");

const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = (e: MouseEvent) => {
  showDropdown.value = !showDropdown.value;
};

// when clicking outside of the profile sub menu, close it
const handleClickOutside = (event: MouseEvent) => {
  if (
    showDropdown.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    showDropdown.value = false;

    // Hidden the submenu
    const dropdownMenu = dropdownRef.value.querySelector("ul");
    if (dropdownMenu) {
      dropdownMenu.classList.add("hidden");
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const signout = async () => {
  const response = await authService.logout();
  if (response.status === 200) {
    toast.add({
      severity: "success",
      summary: "success",
      detail: "You have succesfully logout!",
      life: 2000,
    });

    localStorage.setItem("ifLogin", "false");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }
  console.log(response);
};

onMounted(() => {
  if (fetchUserInfo) {
    fetchUserInfo();
  }
});
</script>
