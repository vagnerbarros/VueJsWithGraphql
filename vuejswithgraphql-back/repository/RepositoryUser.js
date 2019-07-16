var User = require('../schema/user');

class RepositoryUser{

    async save(newUser){

        try{
            let saved = await newUser.save();
            return saved;
        }
        catch(err){
            throw err;
        }
    }

    async list(){

        try{
            let users = await User.find({}).exec();
            return users;
        }
        catch(err){
            throw err;
        }
    }

    async remove(id){

        try{
            let deleted = await User.findOneAndRemove({_id: id}).exec();
            return deleted;
        }
        catch(err){
            throw err;
        }
    }

    async update(user){

        try{
            let updated = await User.findOneAndUpdate({_id: user.id}, user, {new: true}).exec(); 
            return updated;
        }
        catch(err){
            throw err;
        }
    }

    async findId(id){
        
        return await this.query({_id: id});
    }

    async findEmail(email){

        return await this.query({ email: email});
    }

    async query(query){

        try{
            let user = await User.findOne(query).exec();
            return user;
        } 
        catch(err){
            throw err;
        }
    }
}

var user = new RepositoryUser();

module.exports = user;

