const controller = require('../controller/controller');

const resolvers = {
    Query: {
      clients: async () => await controller.cliente.list()
    },
    Mutation: {
      addClient: async (_, args) => {
        try{
          let newClient = await controller.cliente.save(args);
          return newClient;
        }
        catch(err){
          return err.message;
        }
      }
    }
};

module.exports = resolvers;