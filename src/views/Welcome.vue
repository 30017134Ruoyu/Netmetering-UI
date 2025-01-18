<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div style="text-align: center">
      <h1 style="font-size: 24px; margin-bottom: 20px; color: #1677ff">
        OttawaNM
      </h1>
      <div>
        <a-button
          type="primary"
          style="margin-right: 10px"
          @click="goToRegister"
          >Register</a-button
        >
        <a-button type="primary" @click="goToLogin">Login</a-button>
      </div>
      <div>
        <a-button type="primary" @click="fetchLogin">FetchLogin</a-button>
        <a-button type="primary" @click="fetchData">FetchData</a-button>
        <a-button type="primary" @click="fetchWelcome">fetchWelcome</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const URL = "http://localhost:8080";

const fetchLogin = async () => {
  try {
    const response = await fetch(URL + "/login", {
      method: "GET",
      headers: {
        "Content-Type": "text/html", // Expect an HTML response
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      window.location.href = response.url;
    }

    const html = await response.text(); // Parse response as text
    console.log("Login page HTML:", html);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const fetchData = async () => {
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Expect an HTML response
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const html = await response.text(); // Parse response as text
  console.log("Login page HTML:", html);
};

const fetchWelcome = async () => {
  const response = await fetch(URL + "/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Expect an HTML response
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const html = await response.text(); // Parse response as text
  console.log("Login page HTML:", html);
};

const goToLogin = () => {
  router.push("/login");
};

const goToRegister = () => {
  router.push("/register");
};
</script>
