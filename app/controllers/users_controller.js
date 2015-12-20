const mongoose = require("mongoose");
const User = require("../models/user");

exports.create = function*(next) {
  var user = new User();
  user.name = this.request.body.name;
  user.email = this.request.body.email;
  user.password = this.request.body.password;

  yield user.save();
  this.status = 201;
  this.body = "O hai";
};
