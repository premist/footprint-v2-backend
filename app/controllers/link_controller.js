const firebase = require("../modules/firebase");

exports.foursquare = function*(next) {
  try {
    yield firebase.authWithCustomTokenAsync(this.query.token);
  } catch(e) {
    this.status = 422;
    this.body = {
      "success": false,
      "error": "Invalid token"
    }

    return;
  }

  this.session.firebase_token = this.query.token;
  this.status = 301;
  this.redirect("/connect/foursquare");
};

exports.foursquareCallback = function*(next) {
  console.log(this.session);
  this.body = "o hai";
};
