import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useGlobalConfigStore } from '@/stores/globalConfig.js';
import { translate } from "@/helperFunctions/translate"

const app = createApp(App)

app.use(createPinia())
app.config.globalProperties.$translate = translate;
app.use(router)

app.mount('#app')
