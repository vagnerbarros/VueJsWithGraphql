var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  name: String,
  email: String,
  phone: String
});

var Client = mongoose.model("client", clientSchema);

module.exports = Client;
