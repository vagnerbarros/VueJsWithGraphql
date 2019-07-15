<template>
  <div>
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

  //subscriptions
  import CLIENTADDED from '../graphql/client/ClientAdded.gql';
  import CLIENTREMOVED from '../graphql/client/ClientRemoved.gql';
  import CLIENTUPDATED from '../graphql/client/ClientUpdated.gql';

  import { gql } from 'apollo-boost';

  export default {
    data () {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'E-Mail', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Ações', value: 'name', align:'center',  sortable: false }
        ],
        search: '',
        clients: [],
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

        this.$router.push('/clients/new');
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
        this.$router.push({path: '/clients/edit', meta: { client: client}})
        // this.client = client;
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