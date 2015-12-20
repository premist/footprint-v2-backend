const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, match: /@/ },
  identities: {
    foursquare: {
      accessKey: String
    }
  }
});

module.exports = User;
