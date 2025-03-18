<template>
  <div
    style="
      background: url('/images/blocks/signin/signin-2.jpg') no-repeat;
      background-size: cover;
    "
    class="px-4 py-8 md:px-6 lg:px-8"
  >
    <div class="flex flex-wrap">
      <!-- Left -->
      <div
        class="w-full lg:w-6 p-4 lg:p-7"
        style="background-color: rgba(255, 255, 255, 0.7)"
      >
        <img
          src="/images/blocks/logos/bastion-purple.svg"
          alt="Image"
          height="50"
          class="mb-6"
        />
        <div class="text-xl text-900 font-500 mb-3">
          Welcome to Net-Metering
        </div>
        <p class="text-600 line-height-3 mt-0 mb-6">
          A place where you an save your energy and transfer them into real
          dollars to pay your electricity bills
        </p>
        <ul class="list-none p-0 m-0">
          <li class="flex align-items-start mb-4">
            <div>
              <span
                class="flex align-items-center justify-content-center bg-purple-400"
                style="width: 38px; height: 38px; border-radius: 10px"
              >
                <i class="text-xl text-white pi pi-inbox"></i>
              </span>
            </div>
            <div class="ml-3">
              <span class="font-medium text-900">Unlimited Inbox</span>
              <p class="mt-2 mb-0 text-600 line-height-3">
                Tincidunt nunc pulvinar sapien et. Vitae purus faucibus ornare
                suspendisse sed nisi lacus sed viverra.
              </p>
            </div>
          </li>
          <li class="flex align-items-start mb-4">
            <div>
              <span
                class="flex align-items-center justify-content-center bg-purple-400"
                style="width: 38px; height: 38px; border-radius: 10px"
              >
                <i class="text-xl text-white pi pi-shield"></i>
              </span>
            </div>
            <div class="ml-3">
              <span class="font-medium text-900">Premium Security</span>
              <p class="mt-2 mb-0 text-600 line-height-3">
                Scelerisque purus semper eget duis at tellus at urna. Sed risus
                pretium quam vulputate.
              </p>
            </div>
          </li>
          <li class="flex align-items-start">
            <div>
              <span
                class="flex align-items-center justify-content-center bg-purple-400"
                style="width: 38px; height: 38px; border-radius: 10px"
              >
                <i class="text-xl text-white pi pi-globe"></i>
              </span>
            </div>
            <div class="ml-3">
              <span class="font-medium text-900">Cloud Backups Inbox</span>
              <p class="mt-2 mb-0 text-600 line-height-3">
                Egestas sed tempus urna et. Auctor elit sed vulputate mi sit
                amet mauris commodo.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- Right -->
      <div class="w-full lg:w-6 p-4 lg:p-7 surface-card">
        <div class="text-900 text-2xl font-medium mb-6">Login</div>
        <Toast />
        <label for="email3" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <InputText
          id="email3"
          type="text"
          v-model="loginDTO.email"
          placeholder="Email address"
          class="w-full mb-4"
          :invalid="emailInvalid"
        />

        <label for="password3" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <InputText
          id="password3"
          type="password"
          v-model="loginDTO.password"
          placeholder="Password"
          class="w-full mb-4"
          :invalid="passwordInvalid"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="rememberme3"
              :binary="true"
              v-model="checked3"
              class="mr-2"
            ></Checkbox>
            <label for="rememberme3">Remember me</label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <Button
          label="Login"
          icon="pi pi-sign-in"
          class="w-full p-button-secondary"
          @click="signIn()"
          :loading="loading"
        ></Button>

        <Divider align="center" class="my-6">
          <span class="text-600 font-normal text-sm">OR</span>
        </Divider>

        <Button
          label="Sign In with Google"
          icon="pi pi-google"
          class="w-full p-button-secondary mb-2"
          @click="login('google')"
        ></Button>

        <Button
          label="Sign In with Facebook"
          icon="pi pi-facebook"
          class="w-full p-button-secondary mt-2"
          @click="login('facebook')"
        ></Button>

        <div class="mt-6 text-center text-600">
          Don't have an account?
          <a
            tabindex="0"
            class="font-medium text-blue-500"
            style="cursor: pointer"
            @click="router.push('/register')"
            >Sign up</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/api/authService";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const router = useRouter();

let checked3 = ref(false);
let loading = ref(false);

// TODO: FInish the remember me && forgot password functionalities

const loginDTO = ref({
  email: "",
  password: "",
});

const isSubmitted = ref(false);
const emailInvalid = computed(() => isSubmitted.value && !loginDTO.value.email);
const passwordInvalid = computed(
  () => isSubmitted.value && !loginDTO.value.password
);

const signIn = async () => {
  isSubmitted.value = true;
  if (!loginDTO.value.email || !loginDTO.value.password) {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Please fill out the mandatory fields",
      life: 3000,
    });
    return;
  }
  try {
    console.log(loginDTO.value);
    const response = await authService.login(loginDTO.value);
    if (response.data === true) {
      toast.add({
        severity: "success",
        summary: "Thank you!",
        detail: "Identity verified, launching dashboard...",
        life: 1500,
      });

      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        router.push("/dashboard");
      }, 1500);
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Fail to register",
      detail: error.response.data,
      life: 2000,
    });
  }
};

const login = (provider: string) => {
  console.log(provider);
  if (provider === "google") {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  } else if (provider === "facebook") {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  }
};
</script>

<style scoped></style>
