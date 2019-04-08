var URL_MONGO = 'mongodb+srv://anron:t3st3@cluster0-cfpff.mongodb.net/admin';
var MONGO_OPTIONS = { user: 'anron', pass: 't3st3', dbName: 'graphql', useNewUrlParser: true }

const JWT_SECRET = 'TESTE';
const EXPIRACAO_TOKEN = 86400; // EM SEGUNDOS (1 DIA)

module.exports = {
    URL_MONGO,
    MONGO_OPTIONS,
    JWT_SECRET,
    EXPIRACAO_TOKEN
}