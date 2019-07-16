const repository= require('../repository/RepositoryUser');
const User = require('../schema/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/constants');

class ModelUser {

    async save(user) {

        try{

            let exist = await repository.findEmail(user.email);
            if(!exist){

                let newUser = User(user);
                const password = await bcrypt.hash(args.password, 10);
                newUser.password = password;

                let saved = await repository.save(newUser);
                const token = jwt.sign({ userId: saved._id }, JWT_SECRET);

                return {
                    token,
                    email: user.email,
                    name: user.name
                }
            }
        }
        catch(erro){
            return { status: 500, motivo: erro.toString() };
        }
    }

    async login(email, password){

        const user = await repository.findEmail(email)
        if(!user){
            throw new Error('No such user found');
        }
            
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password')
        }
        
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return {
            token,
            email: user.email,
            name: user.name
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

    async update(user){

        try{
            
            return await repository.update(user);
        }
        catch(erro){
            return { status: 500, motivo: erro.toString() };
        }
    }
}

var user = new ModelUser();

module.exports = user;