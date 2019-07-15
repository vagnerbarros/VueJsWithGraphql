<template>
  <v-form v-model="valid" ref="formClient">
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex xs12 sm12>
          <v-widget title="Client Information">
            <div slot="widget-content">
              <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-text-field label="Name" v-model="client.name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field label="E-Mail" v-model="client.email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field label="Phone" v-model="client.phone"></v-text-field>
                    </v-flex>
                  </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>    
      </v-layout>
      <v-layout justify-end>
        <v-btn @click="cancel()">Cancel</v-btn>    
        <v-btn color="primary" :loading="$apollo.loading" @click="send()" :disabled="!valid" data-cy="save">Save</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>

import VWidget from '../components/VWidget';

import ADDCLIENT from '../graphql/client/AddClient.gql';
import UPDATECLIENT from '../graphql/client/UpdateClient.gql';

export default {
  components:{
    VWidget
  },

  data: () => ({

    valid: false,
    client: {
      name: '',
      email: '',
      phone: ''
    }
  }),

  computed: {

    
  },

  methods: {

    async send(){
      
      
      if(this.editMode){

        const result = await this.$apollo.mutate({
          mutation: UPDATECLIENT,
          variables: this.client
        });
      }
      else{

        const result = await this.$apollo.mutate({
          mutation: ADDCLIENT,
          variables: this.client
        })
      }
      this.initialState();
    },

    initialState(){
      this.client = {
          name: '',
          email: '',
          phone: ''
      }
      this.editMode = false;
    },

    cancel() {
      // this.$store.dispatch('client/cancel', {router: this.$router});
    }
  },

  mounted(){
    if(this.$router.currentRoute.fullPath.indexOf('/edit') !== -1){
      this.editMode = true;
    }
    else{
      this.editMode = false;
    }
  }
}
</script>
