const constants = require('./constants');

//conexao mongoose
var mongoose = require('mongoose');
mongoose.connect(constants.URL_MONGO, constants.MONGO_OPTIONS);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));