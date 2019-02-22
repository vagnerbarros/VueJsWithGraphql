const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Client {
    id: ID!
    name: String,
    email: String
    phone: String
  }

  type Query {
    clients : [Client]
  }

  type Mutation {
    addClient(name: String!, email: String!, phone: String): Client
    removeClient(id: String): Client
    updateClient(id: String!, name: String, email: String, phone: String): Client
  }

  type Subscription {
    clientAdded: Client
    clientRemoved: Client
    clientUpdated: Client
  }
`;

module.exports = typeDefs;
