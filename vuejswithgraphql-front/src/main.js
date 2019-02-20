import Vue from 'vue'
import VueApollo from 'vue-apollo';
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

Vue.use(VueApollo);

// const provider = new VueApollo({
//   defaultClient: apolloClient
// });

new Vue({
  router,
  store,
  // provider: provider.provider(),
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
