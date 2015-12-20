const mongoose = require("mongoose");
const User = require("../models/user");

exports.create = function*(next) {
  this.checkBody("name").notEmpty("Name is missing");
  this.checkBody("email").isEmail("Email is missing or invalid");
  this.checkBody("password").notEmpty("Password is missing");

  if (this.errors) {
    this.status = 422;
    this.body = this.errors;
    return;
  }

  var user = new User();
  user.name = this.request.body.name;
  user.email = this.request.body.email;
  user.password = this.request.body.password;

  yield user.save();

  this.status = 201;
  this.body = {"success": "ok"};
};
