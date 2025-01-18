<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <a-form
        ref="formRef"
        :model="formState"
        @finish="onFinish"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="Username">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="Password">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-button">
            Login
          </a-button>
        </a-form-item>
        
        <div class="links">
          <a @click="$router.push('/')">Back to Welcome</a>
          <a-divider type="vertical" />
          <a @click="$router.push('/register')">Register now!</a>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

const router = useRouter()
const formRef = ref<FormInstance>()

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})

const onFinish = async (values: FormState) => {
  try {
    const response = {
      token: 'dummy_token',
      user: {
        username: values.username,
        id: 1,
      }
    }
    
    localStorage.setItem('token', response.token)
    localStorage.setItem('userInfo', JSON.stringify(response.user))
    
    message.success('Login successful!')
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    message.error('Login failed!')
  }
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}

.login-button {
  width: 100%;
}

.links {
  text-align: center;
}
</style>