import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'

import App from './App.vue'
import router from './router'
import AuthenticationService from './services/AuthenticationService/AuthenticationService'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createMetaManager())

app.provide<AuthenticationService>(
  AuthenticationService.SERVICE_NAME,
  new AuthenticationService(router)
)

app.mount('#app')
