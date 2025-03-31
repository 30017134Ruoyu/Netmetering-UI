<template>
  <Header></Header>
  <a-layout class="content">
    <div class="surface-card shadow-0 border-round p-4 m-3">
      <!-- Tab menu -->
      <ul
        class="surface-card px-4 m-0 list-none flex overflow-x-auto select-none"
      >
        <li>
          <a
            v-ripple
            class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-teal-500 transition-colors transition-duration-150 p-ripple"
            :class="{
              'border-teal-500 text-teal-500 hover:border-teal-500':
                active1 === 0,
              'text-700 border-transparent': active1 !== 0,
            }"
            @click="(active1 = 0), (ifForGlobal = false)"
          >
            <i class="pi pi-home mr-2"></i>
            <span class="font-medium">Your Contacts</span>
          </a>
        </li>
        <li>
          <a
            v-ripple
            class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-teal-500 transition-colors transition-duration-150 p-ripple"
            :class="{
              'border-teal-500 text-teal-500 hover:border-teal-500':
                active1 === 1,
              'text-700 border-transparent': active1 !== 1,
            }"
            @click="(active1 = 1), (ifForGlobal = true)"
          >
            <i class="pi pi-users mr-2"></i>
            <span class="font-medium">Global Accounts</span>
          </a>
        </li>
      </ul>
      <section
        class="surface-overlay px-4 my-5 lg:px-6 py-4 px-4 lg:px-6 surface-border"
      >
        <div class="border-bottom-1 surface-border">
          <h2 class="mt-0 mb-2 text-900 font-bold text-4xl">
            Contacts Management
          </h2>
          <p class="mt-0 mb-5 text-700 font-normal text-base">
            You can easily manage your contacts on this page
          </p>
        </div>
        <section
          class="flex flex-wrap gap-3 py-6 justify-content-between border-bottom-1 surface-border"
        >
          <div class="flex-shrink-0 w-15rem">
            <h3
              class="mb-4 mt-0 text-900 font-medium text-xl"
              v-if="!ifForGlobal"
            >
              Contacts
            </h3>
            <h3
              class="mb-4 mt-0 text-900 font-medium text-xl"
              v-if="ifForGlobal"
            >
              Global Accounts
            </h3>
            <p
              class="mb-4 mt-0 text-700 font-normal text-base"
              v-if="!ifForGlobal"
            >
              Manage your contact
            </p>
            <p
              class="mb-4 mt-0 text-700 font-normal text-base"
              v-if="ifForGlobal"
            >
              Organization Accounts
            </p>
            <div>
              <Button
                label="Add a contact"
                class="w-auto text-green-500"
                @click="visible = true"
                outlined
                v-if="!ifForGlobal"
              ></Button>
            </div>
            <div class="mt-2">
              <!-- Confirm dialog -->
              <Toast />
              <ConfirmDialog></ConfirmDialog>
              <Button
                label="Delete contacts"
                severity="danger"
                class="w-auto text-red-400"
                @click="openDialog()"
                outlined
                :disabled="!selectedContacts.length || !contacts.length"
                v-if="!ifForGlobal && contacts.length"
              ></Button>
            </div>
            <Dialog
              v-model:visible="visible"
              modal
              maximizable=""
              header="Add Contacts"
              :style="{ width: '40rem', height: '20rem' }"
            >
              <span class="p-text-secondary block mb-2"
                >Enter email addresses</span
              >
              <span class="p-text-secondary block mb-5"
                >Hit enter when finish entering each</span
              >
              <div class="flex align-items-center gap-3 mb-5">
                <div class="p-fluid w-full">
                  <Chips v-model="newContacts" />
                </div>
              </div>
              <div class="flex justify-content-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="visible = false"
                ></Button>
                <Button type="button" label="Add" @click="addContacts"></Button>
              </div>
            </Dialog>
          </div>
          <p v-if="!contacts.length" class="text-2xl text-center">
            You have no contacts yet
          </p>
          <div class="overflow-x-scroll">
            <!-- User's contacts -->
            <DataTable
              :value="contacts"
              :tabStyle="{ 'min-width': '60rem' }"
              v-model:selection="selectedContacts"
              rowHover
              v-if="!ifForGlobal && contacts.length"
            >
              <Column
                selectionMode="multiple"
                headerStyle="width: 3rem"
              ></Column>
              <Column style="min-width: 25rem">
                <template #header>
                  <span class="font-semibold text-sm text-color-secondary"
                    >Name</span
                  >
                </template>
                <!-- Data represents each row in the array -->
                <template #body="{ data }">
                  <div class="flex align-items-center gap-3">
                    <Avatar
                      :image="'/images/blocks/avatars/circle/avatar-f-11.png'"
                      styleClass="mr-2"
                      size="large"
                      shape="circle"
                    ></Avatar>
                    <div>
                      <p
                        class="mt-0 mb-2 font-medium text-lg text-color-primary"
                      >
                        {{ data.full_name }}
                      </p>
                      <p
                        class="mt-0 mb-2 font-normal text-base text-color-secondary"
                      >
                        {{ data.email }}
                      </p>
                    </div>
                  </div>
                </template>
              </Column>
              <Column style="min-width: 14rem">
                <template #header>
                  <span class="font-semibold text-sm text-color-secondary"
                    >Joined Date</span
                  >
                </template>
                <template #body="{ data }">
                  <p
                    class="mt-0 mb-2 font-normal text-base text-color-secondary"
                  >
                    {{ data.date }}
                  </p>
                </template>
              </Column>
              <Column style="min-width: 13rem">
                <template #header>
                  <span class="font-semibold text-sm text-color-secondary"
                    >Last Active</span
                  >
                </template>
                <template #body="{ data }">
                  <p
                    class="mt-0 mb-2 font-normal text-base text-color-secondary"
                  >
                    {{ data.active }}
                  </p>
                </template>
              </Column>
              <Column style="min-width: 1rem">
                <template #body="{ data }">
                  <Button
                    type="button"
                    icon="pi pi-ellipsis-v"
                    class="p-button-text p-button-secondary"
                    @click="(event: MouseEvent) => openMenu(event, data)"
                  ></Button>
                  <Menu ref="menu" appendTo="body" popup :model="items"></Menu>
                </template>
              </Column>
            </DataTable>
            <!-- Global Accounts -->
            <DataTable
              :value="globalAccounts"
              :tabStyle="{ 'min-width': '60rem' }"
              rowHover
              v-if="ifForGlobal"
            >
              <Column style="min-width: 25rem">
                <template #header>
                  <span class="font-semibold text-sm text-color-secondary"
                    >Name</span
                  >
                </template>
                <!-- Data represents each row in the array -->
                <template #body="{ data }">
                  <div class="flex align-items-center gap-3">
                    <Avatar
                      :image="'/images/blocks/avatars/circle/avatar-f-3.png'"
                      styleClass="mr-2"
                      size="large"
                      shape="circle"
                    ></Avatar>
                    <div>
                      <p
                        class="mt-0 mb-2 font-medium text-lg text-color-primary"
                      >
                        {{ data.full_name }}
                      </p>
                      <p
                        class="mt-0 mb-2 font-normal text-base text-color-secondary"
                      >
                        {{ data.email }}
                      </p>
                    </div>
                  </div>
                </template>
              </Column>
              <Column style="min-width: 14rem">
                <template #header>
                  <span class="font-semibold text-sm text-color-secondary"
                    >Joined Date</span
                  >
                </template>
                <template #body="{ data }">
                  <p
                    class="mt-0 mb-2 font-normal text-base text-color-secondary"
                  >
                    {{ data.date }}
                  </p>
                </template>
              </Column>
              <Column style="min-width: 13rem">
                <template #header>
                  <span class="font-semibold text-sm text-color-secondary"
                    >Last Active</span
                  >
                </template>
                <template #body="{ data }">
                  <p
                    class="mt-0 mb-2 font-normal text-base text-color-secondary"
                  >
                    {{ data.active }}
                  </p>
                </template>
              </Column>
              <Column style="min-width: 8rem">
                <template #body>
                  <Button
                    type="button"
                    icon="pi pi-ellipsis-v"
                    class="p-button-text p-button-secondary"
                    @click="($refs.menu as any).toggle($event)"
                  ></Button>
                  <Menu ref="menu" appendTo="body" popup :model="items"></Menu>
                </template>
              </Column>
            </DataTable>
          </div>
        </section>
      </section>
    </div>
    <a-layout-footer class="footer"> Ottawa NM ©2024 </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { handleUnlogin, loadGlobalAccounts } from "@/utils/common";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import type { User, Transaction } from "@/types";
import { userService } from "@/api/userService";
import { contactsService } from "@/api/contactsService";
import { useConfirm } from "primevue/useconfirm";

// Current logged in user
const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const active1 = ref(0);
const ifForGlobal = ref(false);
const visible = ref(false);
const newContacts = ref();
const globalAccounts = ref<Array<{ email: string; full_name?: string }>>([]);
const contacts = ref<Array<User>>([]);
const selectedRow = ref<User | null>(null);

const selectedContacts = ref<Array<User>>([]);

watch(selectedContacts, async (newV, oldV) => {
  console.log(newV);
});

// Single row info, when click the 3 dot button on the right
const menu = ref();
const openMenu = (event: Event, rowData: User) => {
  selectedRow.value = rowData;
  (menu.value as any).toggle(event);
};

// Dynamically generate the items button, for global and non-global accounts
const items = computed(() => {
  const baseItems = [
    {
      label: "Options",
      items: [
        {
          label: "Transfer",
          icon: "pi pi-send",
          command: () => {
            router.push("/transfer");
          },
        },
      ],
    },
  ];

  if (!ifForGlobal.value) {
    baseItems[0].items.push({
      label: "Delete",
      icon: "pi pi-times",
      command: () => {
        openDialog2();
      },
    });
  } else {
    // DO nothing yet
    // baseItems[0].items.push({ label: "Request Access", icon: "pi pi-unlock" });
  }

  return baseItems;
});

const addContacts = async () => {
  try {
    if (newContacts.value === null || newContacts.value === undefined) {
      toast.add({
        severity: "warn",
        summary: "Failed",
        detail: "Please enter a valid email address",
        life: 3000,
      });
      return;
    }
    const response = await contactsService.addContacts(newContacts.value);
    console.log(response);
    if (response) {
      const updatedContacts = await contactsService.getAllContacts();
      contacts.value = updatedContacts.data;
      toast.add({
        severity: "success",
        summary: "success",
        detail: "Contacts added successfully!",
        life: 3000,
      });
      newContacts.value = null;
      visible.value = false;
    }
  } catch (error: any) {
    if (error.status !== 500) {
      newContacts.value = null;
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: error.response.data,
        life: 3000,
      });
    } else {
      newContacts.value = null;
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: "Please enter a valid email",
        life: 3000,
      });
    }
  }
};

const openDialog = () => {
  confirm.require({
    message: "Are you sure you want to delete the selected contacts?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Cancel",
    acceptLabel: "Confirm",
    acceptClass: "p-button-outlined text-green-500",
    accept: () => {
      deleteContacts();
    },
  });
};

const openDialog2 = () => {
  confirm.require({
    message: "Are you sure you want to delete the selected contacts?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Cancel",
    acceptLabel: "Confirm",
    acceptClass: "p-button-outlined text-green-500",
    accept: () => {
      deleteContact();
    },
  });
};

const deleteContact = async () => {
  try {
    const email = selectedRow.value?.email;
    if (email) {
      const response = await contactsService.deleteContacts([email]);
      console.log(response);
      if (response) {
        const updatedContacts = await contactsService.getAllContacts();
        contacts.value = updatedContacts.data;
        toast.add({
          severity: "success",
          summary: "success",
          detail: "Contacts deleted successfully!",
          life: 3000,
        });
      }
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: error.response.data,
      life: 3000,
    });
  }
};

const deleteContacts = async () => {
  try {
    const emails = selectedContacts.value.map((user) => user.email);

    const response = await contactsService.deleteContacts(emails);
    console.log(response);
    if (response) {
      const updatedContacts = await contactsService.getAllContacts();
      contacts.value = updatedContacts.data;
      toast.add({
        severity: "success",
        summary: "success",
        detail: "Contacts deleted successfully!",
        life: 3000,
      });
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: error.response.data,
      life: 3000,
    });
  }
};

onMounted(async () => {
  try {
    // Make sure user is logged in
    await userService.getUserInfo();
    handleUnlogin(userStore.user, router);
    // Load global accounts (contacts)
    const accounts = await loadGlobalAccounts();
    const contactList = await contactsService.getAllContacts();
    if (accounts) {
      globalAccounts.value = accounts;
    }
    if (contactList) {
      console.log(contactList.data);
      contacts.value = contactList.data;
    }
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
