const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const controller = require('../controller/controller');

const CLIENT_ADDED = 'CLIENT_ADDED';

const resolvers = {
    Query: {
      clients: async () => await controller.cliente.list()
    },
    Mutation: {
      addClient: async (_, args) => {
        try{
          let newClient = await controller.cliente.save(args);
          pubsub.publish(CLIENT_ADDED, { clientAdded: newClient });
          return newClient;
        }
        catch(err){
          return err.message;
        }
      }
    },
    Subscription: {
      clientAdded: {
        subscribe: () => pubsub.asyncIterator([CLIENT_ADDED])
      }
    }
};

module.exports = resolvers;