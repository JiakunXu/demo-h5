import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import EventChannel from '@/utils/eventChannel'

import './assets/main.css'
import 'vant/es/dialog/style'
import 'vant/es/toast/style'

const app = createApp(App)
const eventChannel = new EventChannel();

app.use(createPinia())
app.use(router)

app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('wx-open-launch')
}

app.config.globalProperties.$$emit = (eventName, ...args) => { eventChannel.emit(eventName, ...args); }
app.config.globalProperties.$$off = (eventName, ...args) => { eventChannel.off(eventName, ...args); }
app.config.globalProperties.$$on = (eventName, ...args) => { eventChannel.on(eventName, ...args); }
app.config.globalProperties.$$once = (eventName, ...args) => { eventChannel.once(eventName, ...args); }

app.mount('#app')
