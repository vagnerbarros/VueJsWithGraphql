<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../assets/logo.png" alt="Vagner Barros" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Vagner Barros</h1>
                </div>                
                <v-form v-model="valid" ref="formLogin">
                  <v-text-field autofocus append-icon="person" label="E-Mail" type="text" :rules="validateEmail" v-model="user.email"></v-text-field>
                  <v-text-field append-icon="lock" label="Password" type="password" :rules="validatePassword" v-model="user.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="validate(user)" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex';
import LOGIN from '../graphql/Login.gql';

import moment from 'moment';
import colors from 'vuetify/es5/util/colors';
import validador from '@/util/validador';

export default {
  data() {
    return {
      valid: false,
      validateEmail: [v => !!v || "Fill E-Mail", v => (v && validador.email(v)) || 'Invalid E-mail'],
      validatePassword: [v => !!v || "Fill Password"],
      user: {
        email: '',
        password: ''
      },
      loading: false,
      colors: colors
    };
  },

  methods: {

    validate(user){
      if(this.$refs.formLogin.validate()){
        this.login(user);
      }
      else{

      }
    },

    async login(user) {
      
      this.loading = true;

      try{

        let result = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: this.user
        });

        let response = result.data;
          
        localStorage.setItem("token", response.login.token);
          
        this.$store.commit("setUser", {
          name: response.login.name,
          email: response.login.email
        });

        this.$store.commit('setSucessText', 'Welcome ' + response.login.name);
        this.$router.replace({ path: "/home" });
      }
      catch(err){
        localStorage.removeItem("token");
        this.$store.commit('setErrorText', err);
      }
      this.carregando = false;
    },

    ...mapState({
      snackbar : 'snackbar'
    })
  }
};
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>