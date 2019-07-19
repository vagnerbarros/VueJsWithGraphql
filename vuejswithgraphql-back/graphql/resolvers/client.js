const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const controller = require('../../controller/controller');

const CLIENT_ADDED = 'CLIENT_ADDED';
const CLIENT_REMOVED = 'CLIENT_REMOVED';
const CLIENT_UPDATED = 'CLIENT_UPDATED';

const resolvers = {
    Query: {
      clients: async () => await controller.client.list()
    },
    Mutation: {
      addClient: async (_, args) => {
        try{
          let newClient = await controller.client.save(args);
          pubsub.publish(CLIENT_ADDED, { clientAdded: newClient });
          return newClient;
        }
        catch(err){
          return err.message;
        }
      },
      removeClient: async (_, args) => {
        try{
          let clientRemoved = await controller.client.remove(args.id);
          pubsub.publish(CLIENT_REMOVED, { clientRemoved: clientRemoved });
          return clientRemoved;
        }
        catch(err){
          return err.message;
        }
      },
      updateClient: async (_, args) => {
        try{
          let clientUpdated = await controller.client.update(args);
          pubsub.publish(CLIENT_UPDATED, { clientUpdated: clientUpdated });
          return clientUpdated;
        }
        catch(err){
          return err.message;
        }
      }
    },
    Subscription: {
      clientAdded: {
        subscribe: () => pubsub.asyncIterator([CLIENT_ADDED])
      },
      clientRemoved: {
        subscribe: () => pubsub.asyncIterator([CLIENT_REMOVED])
      },
      clientUpdated: {
        subscribe: () => pubsub.asyncIterator([CLIENT_UPDATED])
      }
    }
};

module.exports = resolvers;