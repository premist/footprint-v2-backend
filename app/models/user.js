const mongoose = require("mongoose");
const scrypt = require("scrypt");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const scryptParameters = scrypt.paramsSync(0.1);

const UserSchema = new Schema({
  name: String,
  email: { type: String, match: /@/ },
  password: { type: String },
  identities: {
    foursquare: {
      accessKey: String
    }
  }
});

UserSchema.pre("save", function(next) {
  var that = this;
  var pw = this.password;

  scrypt.kdf(process.env.NXO_SECRET_BASE, { N: 1, r: 1, p: 1 }).then(function(result) {
    that.password = result.toString("hex");
    next();
  }, function(err) {
    next(err);
  });
});

module.exports = mongoose.model("User", UserSchema);
