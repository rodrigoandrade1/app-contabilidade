import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App).use(router)
app.use(store)
app.use(VueToast, {
  position: 'top',
  type: 'success',
  duration: 3000
})
app.mount('#app')
