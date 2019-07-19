<template>
  <v-dialog v-model="dialog" max-width="800px" @keydown.esc="close" persistent >
    <v-form v-model="valid">
      <v-card>
        <v-toolbar dark color="primary" dense flat>
          <v-toolbar-title class="white--text">Client Information</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm12>
                  <v-text-field label="Name" v-model="client.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-text-field label="E-Mail" v-model="client.email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field label="Phone" v-model="client.phone"></v-text-field>
                </v-flex>
            </v-layout>    
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn @click="close()">Cancelar</v-btn>
          <v-btn color="primary" @click="save()" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  
  import validator from '@/util/validador';

  export default {
    
    props: ['dialog', 'client'],

    data() { 
      return {
        valid: false,
      }
    },

    methods: {
      
      close(){
        this.$emit('close');
      },

      save(){
        this.$emit('saveClient', this.pagamento);
      }
    }
  }
</script>