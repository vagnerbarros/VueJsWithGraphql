<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-data-table :headers="headers" :items="clients" :loading="$apollo.loading" :search="busca" class="elevation-1">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td class="justify-center layout px-0">
            <v-icon class="mr-2">edit</v-icon>
            <v-icon>delete</v-icon>
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
  import CLIENTS from '../graphql/Clients.gql'
  import ADDCLIENT from '../graphql/AddClient.gql'

  export default {
    data () {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'E-Mail', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Ações', value: 'name', align:'center',  sortable: false }
        ],
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
            query: CLIENTS
        }
    },

    computed: {
        
        
    },

    methods: {

        async saveClient(){
            
            const result = await this.$apollo.mutate({
                mutation: ADDCLIENT,
                variables: this.$data.client
            })
        },

        temp(){

            // this.$apollo.provider.defaultClient;
            // this.$apollo.queries;
            // this.$apollo.subscription;
            // this.$apollo.provider;
            // this.$apollo.loading;
            // this.$apollo.skipAllQueries;
            // this.$apollo.skipAllSubscriptions;
            // this.$apollo.skipAll;
        }
    },

    created(){
      

    }
  }
</script>