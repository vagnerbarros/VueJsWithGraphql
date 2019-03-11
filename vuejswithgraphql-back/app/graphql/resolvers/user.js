const controller = require('../../controller/controller');

const resolvers = {

    Mutation: {

        signup: async (parent, args, context, info) => {
            
            return await controller.user.save(args);
        },
          
        login: async (parent, args, context, info) => {
            
            return await controller.user.login(args.email, args.password);
        }
    }
}

module.exports = resolvers;