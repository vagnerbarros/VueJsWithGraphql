<template>
  <div>
    <dialog-client :dialog="showDialogClient" :client="client" @close="showDialogClient = false" @saveClient="save"></dialog-client>
    <v-container fluid>
      <v-card>
        <v-toolbar flat color="white">
          <v-text-field flat solo full-width single-line hide-details clearable v-model="search" max-width="300px" prepend-inner-icon="search" label="Search Client"></v-text-field>
          <v-btn color="primary" @click="newClient()">New Client</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table color="transparent" :headers="headers" :rows-per-page-items="[100]" :items="clients" :loading="$apollo.loading" :search="search">
          <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.phone }}</td>
              <td class="justify-center layout px-0">
                <v-icon class="mr-2" @click="editClient(props.item)">edit</v-icon>
                <v-icon @click="removeClient(props.item)">delete</v-icon>
              </td>
          </template>
          </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>

  import {mapState, mapGetters, mapActions} from 'vuex';
  import CLIENTS from '../graphql/client/Clients.gql';
  import ADDCLIENT from '../graphql/client/AddClient.gql';
  import UPDATECLIENT from '../graphql/client/UpdateClient.gql';
  import REMOVECLIENT from '../graphql/client/RemoveClient.gql';

  //subscriptions
  import CLIENTADDED from '../graphql/client/ClientAdded.gql';
  import CLIENTREMOVED from '../graphql/client/ClientRemoved.gql';
  import CLIENTUPDATED from '../graphql/client/ClientUpdated.gql';

  import { gql } from 'apollo-boost';

  import DialogClient from '../components/dialogs/DialogClient';

  export default {

    components: {
      DialogClient
    },

    data () {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'E-Mail', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Ações', value: 'name', align:'center',  sortable: false }
        ],
        search: '',
        showDialogClient: false,
        clients: [],
        client: {
          name: '',
          email: '',
          phone: ''
        },
        editMode: false
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

      newClient(){

        this.showDialogClient = true;
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
        this.client = client;
        this.editMode = true;
        this.showDialogClient = true;
      },

      async save(client){

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
          });
        }
        this.initialState();
      },

      initialState(){
        this.client = {
            name: '',
            email: '',
            phone: ''
        }
        this.showDialogClient = false;
        this.editMode = false;
      }
    }
  }
</script>