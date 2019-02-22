var URL_MONGO = '';
var MONGO_OPTIONS = {}

if(process.env.NODE_ENV == 'test'){
    URL_MONGO = 'mongodb://<URL_TO_MONGO>:27017/admin';
    MONGO_OPTIONS = {user: '<USER>', pass: '<PASSWORD>', dbName: '<DB_NAME>', useNewUrlParser: true};
}
else{
    URL_MONGO = 'mongodb://<URL_TO_MONGO>:27017/admin';
    MONGO_OPTIONS = {user: '<USER>', pass: '<PASSWORD>', dbName: '<DB_NAME>', useNewUrlParser: true};
}

const JWT_SECRET = '';
const EXPIRACAO_TOKEN = 86400; // EM SEGUNDOS (1 DIA)

module.exports = {
    URL_MONGO,
    MONGO_OPTIONS,
    JWT_SECRET,
    EXPIRACAO_TOKEN
} 