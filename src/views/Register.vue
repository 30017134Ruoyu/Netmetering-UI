<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Register to My Account</h2>
      
      <a-form :model="formState" @finish="onFinish" layout="vertical">
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input 
            v-model:value="formState.username"
            size="large"
            placeholder="Username"
          >
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            size="large"
            placeholder="Password"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          name="confirmPassword"
          :rules="[
            { required: true, message: 'Please confirm your password!' },
            { validator: validatePassword }
          ]"
        >
          <a-input-password
            v-model:value="formState.confirmPassword"
            size="large"
            placeholder="Confirm the password"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          name="email"
          :rules="[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]"
        >
          <a-input
            v-model:value="formState.email"
            size="large"
            placeholder="Email"
          >
            <template #prefix>
              <mail-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember">
            Remember my username and password
          </a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button 
            type="primary" 
            html-type="submit"
            :loading="loading"
            block
            size="large"
          >
            Register
          </a-button>
        </a-form-item>

        <div class="links">
          <a @click="$router.push('/')">Back to Welcome</a>
          <a-divider type="vertical" />
          <a @click="$router.push('/login')">Already have an account? Login</a>
        </div>
      </a-form>

      <div class="footer-text">
        This site protected by reCAPTCHA Enterprise. The Google 
        <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and
        <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  remember: false
})

const validatePassword = async (_rule: any, value: string) => {
  if (value && value !== formState.password) {
    throw new Error('The two passwords do not match!')
  }
}

const onFinish = async (values: FormState) => {
  try {
    loading.value = true
    // 模拟 API 调用
    const response = {
      token: 'dummy_token',
      user: {
        username: values.username,
        email: values.email,
        id: 1,
      }
    }
    
    localStorage.setItem('token', response.token)
    localStorage.setItem('userInfo', JSON.stringify(response.user))
    
    message.success('Registration successful!')
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
    message.error('Registration failed!')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}

.register-card {
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

.links {
  text-align: center;
}

.footer-text {
  margin-top: 24px;
  text-align: left;
  color: #666;
  font-size: 12px;
}
</style>