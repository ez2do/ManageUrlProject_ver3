import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

// const authData = localStorage.getItem("token");
// const emailData = localStorage.getItem("email");
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
