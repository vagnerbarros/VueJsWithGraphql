const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./util/mongoose');

const { merge } = require("lodash");
const { makeExecutableSchema } = require('graphql-tools');

let client = require('./graphql/resolvers/client');

const schemas = makeExecutableSchema({
  typeDefs: require('./graphql/schema'),
  resolvers: merge(client)
})

app.use(bodyParser.urlencoded({ limit: '50mb', extended : true}));
app.use(bodyParser.json({limit : '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// const resolvers = require('./graphql/resolvers');
  
const server = new ApolloServer({ 
  schema: schemas
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(3000, () => {
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:3000${server.subscriptionsPath}`)
});

// app.listen({ port: 3000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
// );