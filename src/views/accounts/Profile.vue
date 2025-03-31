<template>
  <div class="surface-card p-5 shadow-2 border-round flex-auto xl:ml-5">
    <div class="text-900 font-semibold text-lg mt-3">Profile</div>
    <Divider></Divider>
    <div class="flex gap-5 flex-column-reverse md:flex-row">
      <div class="flex-auto p-fluid">
        <div class="mb-4">
          <label for="email" class="block font-normal text-900 mb-2"
            >Name</label
          >
          <InputText id="email" type="text" />
        </div>
        <div class="mb-4">
          <label for="bio" class="block font-normal text-900 mb-2">Bio</label>
          <Textarea id="bio" type="text" rows="5" autoResize></Textarea>
          <p class="mt-2 mb-0 font-medium text-base text-600">
            You can
            <span class="font-medium text-900">@mention</span> other users and
            organizations to link to them.
          </p>
        </div>
        <div class="mb-4">
          <label for="website" class="block font-normal text-900 mb-2"
            >URL</label
          >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">https://</span>
            <InputText id="website" type="text" />
          </div>
        </div>
        <div class="mb-4">
          <label for="company" class="block font-normal text-900 mb-2"
            >Company</label
          >
          <InputText id="company" type="text" />
        </div>
        <div class="mb-4">
          <label for="visibility" class="block font-normal text-900 mb-2"
            >Profile Visibility</label
          >
          <div class="flex align-items-center">
            <Checkbox v-model="value1" binary inputId="visibility"></Checkbox>
            <span class="ml-2 font-normal text-base text-color-primary"
              >Make profile private and hide all activity</span
            >
          </div>
        </div>
        <div>
          <Button
            label="Update Profile"
            class="w-auto mt-3 text-green-500"
            outlined
          ></Button>
        </div>
      </div>
      <div class="flex flex-column align-items-center flex-or">
        <span class="font-normal text-900 mb-2">Profile Picture</span>
        <img
          src="/images/blocks/avatars/circle-big/avatar-f-2.png"
          class="h-10rem w-10rem"
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          class="p-button-rounded -mt-4"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, RouterView, RouterLink } from "vue-router";
import { handleUnlogin, loadGlobalAccounts } from "@/utils/common";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import type { User, Transaction } from "@/types";
import { userService } from "@/api/userService";
import { contactsService } from "@/api/contactsService";

// Current logged in user
const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const value1 = ref(false);
</script>
