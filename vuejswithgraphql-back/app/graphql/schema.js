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
`;

module.exports = typeDefs;
