const Firebase = require("firebase");
const firebase = new Firebase(process.env.FIREBASE_URL);

const Fireproof = require("fireproof");
const fireproof = new Fireproof(firebase);

fireproof.authWithCustomToken(process.env.FIREBASE_SECRET).catch(function(e) {
  console.error("Failed to authenticate with Firebase server.");
  console.log(e);
});

module.exports = fireproof;
