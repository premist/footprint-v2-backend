const Firebase = require("firebase");
const firebase = new Firebase(process.env.FIREBASE_URL);

const Fireproof = require("fireproof");
const fireproof = new Fireproof(firebase);

module.exports = fireproof;
