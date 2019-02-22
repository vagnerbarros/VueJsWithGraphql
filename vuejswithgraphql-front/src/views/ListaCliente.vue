<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-data-table :headers="headers" :rows-per-page-items="[100]" :items="clients" :loading="$apollo.loading" :search="busca" class="elevation-1">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td class="align-right">
            <v-icon class="mr-2" @click="editClient(props.item)">edit</v-icon>
            <v-icon @click="removeClient(props.item)">delete</v-icon>
            </td>
        </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 sm12>
          <v-form v-model="valid" ref="formCliente">
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
                <v-layout justify-end>
                    <v-btn >Cancel</v-btn>    
                    <v-btn color="primary" @click="saveClient()" :loading="$apollo.loading" :disabled="!valid">Save</v-btn>
                </v-layout>
            </v-container>
          </v-form>
      </v-flex>    
    </v-layout>
  </v-container>
</template>

<script>

  import {mapState, mapGetters, mapActions} from 'vuex';
  import CLIENTS from '../graphql/Clients.gql';
  import ADDCLIENT from '../graphql/AddClient.gql';
  import UPDATECLIENT from '../graphql/UpdateClient.gql';
  import REMOVECLIENT from '../graphql/RemoveClient.gql'
  
  //subscriptions
  import CLIENTADDED from '../graphql/ClientAdded.gql';
  import CLIENTREMOVED from '../graphql/ClientRemoved.gql';
  import CLIENTUPDATED from '../graphql/ClientUpdated.gql';

  export default {
    data () {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'E-Mail', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Ações', value: 'name', align:'center',  sortable: false }
        ],
        editMode: false,
        valid: true,
        client: {
            name: '',
            email: '',
            phone: ''
        },
        clients: [],
        busca: '',
      }
    },

    apollo: {

      clients: {
        query: CLIENTS,
        subscribeToMore: [{
          document: CLIENTADDED,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              clients: [...previousResult.clients, subscriptionData.data.clientAdded, ],
            }
          }
        },
        {
          document: CLIENTREMOVED,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              clients: [...previousResult.clients.filter(client => client.id != subscriptionData.data.clientRemoved.id ), ],
            }
          }
        },
        {
          document: CLIENTUPDATED,
          updateQuery: (previousResult, { subscriptionData }) => {

            let clientUpdated = previousResult.clients.find(client => client.id == subscriptionData.data.clientUpdated.id);
            if(clientUpdated){
              clientUpdated = subscriptionData.data.clientUpdated;
            }

            return {
              clients: [...previousResult.clients ],
            }
          }
        }]
      }
    },

    computed: {
        
        
    },

    methods: {

      async saveClient(){
        
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

      async removeClient(client){
        const result = await this.$apollo.mutate({
          mutation: REMOVECLIENT,
          variables: { 
            id: client.id
          }
        })
      },

      editClient(client){
        this.editMode = true;
        this.client = client;
      },

      initialState(){
        this.client = {
            name: '',
            email: '',
            phone: ''
        }
        this.editMode = false;
      }
    }
  }
</script>