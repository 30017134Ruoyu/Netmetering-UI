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
        
        <a-button type="primary" @click="fetchLogin">Login</a-button>
      </div>
      <div>
        <a-button type="primary" @click="fetchData">FetchData</a-button>
        <a-button type="primary" @click="fetchWelcome">fetchWelcome</a-button>
        <a-button type="primary" @click="transfer">Transfer</a-button>
        <a-button type="primary" @click="fetchInfo">FetchInfo</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const URL = "http://localhost:8080";
const fetchInfo = async () => {
  try {
    const response  = await fetch(URL + "/api/user/info",{

      method: "GET",
      headers: {
        "Content-Type": "application/json", // Expect an HTML response
      },
      credentials: "include",});
      const info = await response.json();

      console.log (info)

    
  } catch (error) {
    
  }
}

const transfer = async () => {
  try {
    const requestBody = {
      amount: 2000.0,
      fromEmail: "1346139924lry@gmail.com",
      toEmail: "zj15996659920@gmail.com",
    };
    const response = await fetch(URL + "/api/transfer/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      console.log("Transacton succeed!");
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

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
