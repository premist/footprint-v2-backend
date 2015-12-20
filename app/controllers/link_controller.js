exports.foursquare = function*(next) {
  this.session.firebase_token = this.query.token;
  console.log(this.query.token);

  this.status = 301;
  this.redirect("/connect/foursquare");
};

exports.foursquareCallback = function*(next) {
  console.log(this.session);
  this.body = "o hai";
};
