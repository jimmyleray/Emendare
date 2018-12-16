import Vue from 'vue'
import '@babel/polyfill'
import '@/plugins/vuetify'
import '@/core/registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import App from '@/components/App.vue'
import router from '@/services/router'
import store from '@/services/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
