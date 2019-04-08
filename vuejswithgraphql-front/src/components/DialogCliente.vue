<template>
  <v-dialog v-model="dialog" max-width="800px" @keydown.esc="fechar" persistent >
    <v-form v-model="valid" ref="formCliente">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="white--text">Adicionar Cliente</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-text-field label="Nome" v-model="cliente.name" readonly></v-text-field>
            </v-flex>      
            <v-flex xs12 sm4>
              <v-text-field label="E-mail" v-model="cliente.email"></v-text-field>
            </v-flex>
            <v-flex xs12 sm8>
              <v-text-field label="Telefone" v-model="cliente.phone"></v-text-field>
            </v-flex>
        </v-layout>      
        </v-container>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn @click="fechar()">Cancelar</v-btn>
        <v-btn color="primary" @click="salvar()">Enviar</v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  
  import formatador from '@/util/formatador';

  export default {
    
    props: ['dialog', 'client'],

    data: () => ({
      valid: false,
      client: {
          name: '',
          email: '',
          phone: ''
      }
    }),

    methods: {
      
      fechar(){
          this.$emit('fechar');
          this.limpar();
      },

      salvar(){
        
        if(this.$refs.formCliente.validate()){
          
          this.limpar();
        }
      },

      limpar(){
        this.client = {
          name: '',
          email: '',
          phone: ''
        }
      }
    }
  }
</script>