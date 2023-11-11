import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import AuthenticationService from './services/authentication/AuthenticationService'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide<AuthenticationService>(AuthenticationService.SERVICE_NAME, new AuthenticationService())

app.mount('#app')
