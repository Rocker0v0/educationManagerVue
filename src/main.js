import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElemenentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElemenentUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
