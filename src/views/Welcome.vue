<template>
  <div style="width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center;">
    <div style="text-align: center;">
      <h1 style="font-size: 24px; margin-bottom: 20px; color: #1677ff;">OttawaNM</h1>
      <div>
        <a-button type="primary" style="margin-right: 10px;" @click="goToRegister">Register</a-button>
        <a-button type="primary" @click="goToLogin">Login</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>