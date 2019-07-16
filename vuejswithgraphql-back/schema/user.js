var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  name: String
});

var User = mongoose.model("user", userSchema);

module.exports = User;
