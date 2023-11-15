<script setup lang="ts">
import { inject, ref } from 'vue'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import type { AuthenticationService } from '@/services/authentication-service'
import { authenticationServiceInjectionKey } from '@/constants/injection-key'

const authenticationService = inject<AuthenticationService>(authenticationServiceInjectionKey)

const loginForm = ref({
  email: '',
  password: ''
})

const rules = {
  email: { required, email, $autoDirty: true },
  password: { required, $autoDirty: true }
}

const $v = useVuelidate(rules, loginForm)

const onFormSubmit = () => {
  $v.value.$touch()

  if (!$v.value.$invalid) {
    authenticationService?.login()
  }
}
</script>

<template>
  <div class="flex justify-center">
    <form class="bg-white flex flex-col p-2 w-96 shadow-2xl" @submit.prevent="onFormSubmit">
      <label for="email" class="p-2 text-left">Email address</label>
      <input
        v-model="loginForm.email"
        type="text"
        class="border-2 p-4"
        id="email"
        name="email"
        formControlName="email"
      />

      <p v-if="$v.email.$error" class="mt-1 text-right text-red">This field is required</p>

      <label for="password" class="p-2 text-left">Password</label>
      <input
        v-model="loginForm.password"
        type="password"
        class="border-2 p-4"
        id="password"
        name="password"
        formControlName="password"
      />

      <p v-if="$v.password.$error" class="mt-1 text-right text-red">This field is required</p>

      <button type="submit" class="bg-green mt-4 p-4 color-white font-medium uppercase">
        Log in
      </button>
    </form>
  </div>
</template>
