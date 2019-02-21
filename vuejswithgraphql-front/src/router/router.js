import Vue from 'vue'
import Router from 'vue-router'

import ListaCliente from '../views/ListaCliente';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'clientes',
      component: ListaCliente
    }
  ]
})
