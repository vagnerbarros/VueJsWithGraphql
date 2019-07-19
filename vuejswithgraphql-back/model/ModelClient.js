var repository= require('../repository/RepositoryClient');
var Client = require('../schema/client');

class ModelClient {

    save(client) {

        try{

            let newClient = Client(client);
            return repository.save(newClient);
        }
        catch(erro){
            return { status: 500, motivo: erro.toString() };
        }
    }

    list(){

        try{

            return repository.list();
        }
        catch(erro){
            return { status: 500, motivo: erro.toString() };
        }
    }


    remove(id) {
        
        try{

            return repository.remove(id);
        }
        catch(erro){
            return { status: 500, motivo: erro.toString() };
        }
    }

    async update(client){

        try{
            
            return await repository.update(client);
        }
        catch(erro){
            return { status: 500, motivo: erro.toString() };
        }
    }
}

var client = new ModelClient();

module.exports = client;