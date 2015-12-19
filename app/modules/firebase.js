const Firebase = require("firebase");
const firebase = new Firebase(process.env.FIREBASE_URL);

module.exports = firebase;
