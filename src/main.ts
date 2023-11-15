import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { authenticationServiceInjectionKey } from './constants/injection-key'
import { AuthenticationService } from './services/authentication-service'

const app = createApp(App)

app.provide(authenticationServiceInjectionKey, new AuthenticationService())

app.use(createPinia())
app.use(router)

app.mount('#app')
