import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/tailwind.css';

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
