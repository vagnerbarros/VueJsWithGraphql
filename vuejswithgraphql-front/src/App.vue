<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <router-view></router-view>
      </v-app>
    </template>
  </div>
</template>

<script>

import ListaCliente from './views/ListaCliente';

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    ListaCliente
  }
}
</script>
