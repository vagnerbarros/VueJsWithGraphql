import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'font-awesome/css/font-awesome.css';

import VueApollo from 'vue-apollo';
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
