const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./util/mongo');

const { merge } = require("lodash");
const { makeExecutableSchema } = require('graphql-tools');

let client = require('./graphql/resolvers/client');
let user = require('./graphql/resolvers/user');

const schemas = makeExecutableSchema({
  typeDefs: require('./graphql/schema'),
  resolvers: merge(client, user)
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

const PORT = process.env.PORT || '7001';
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});