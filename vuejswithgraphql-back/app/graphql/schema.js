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
  }

  type Subscription {
    clientAdded: Client
  }
`;

module.exports = typeDefs;
