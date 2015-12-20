const crypto = require("crypto");

const gcs = require("../modules/gcs");
const bucket = gcs.client.bucket(process.env.NXO_GCS_BUCKET);

const swarm = require("../modules/swarm");
const firebase = require("../modules/firebase");

var checkinProcessor = function(data) {
  console.log("Processing checkin..");

  return uploadImage(data).then(function() {
    return swarmCheckin(data);
  });
};

// Adds imagePath to the data
var uploadImage = function(data) {
  console.log("Uploading image...");

  // Don't try to process image if nothing is provided
  if(!data.image) {
    return new Promise(function(resolve, reject) { resolve(data); });
  }

  var binaryImage = new Buffer(data.image, "base64");

  var today = new Date();
  var randomString = crypto.randomBytes(16).toString("hex");
  var imagePath = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}/${randomString}`;
  var fullPath = `https://${bucket}.storage.googleapis.com/${imagePath}`;

  return gcs.uploadFile(binaryImage, bucket, imagePath).then(function(file) {
    return new Promise(function(resolve, reject) {
      var newData = data;
      newData.imagePath = fullPath;
      resolve(newData);
    });
  });
};

var swarmCheckin = function(data) {
  var newData = data;

  // Get venue and get travel object for this activity
  return swarm.getVenue(data.venue_id).then(function(resp) {
    console.log("Got venue!");
    var venue = resp.data.response.venue;
    console.log("Venue", venue);

    newData.venue_id = venue.id;
    newData.venue_name = venue.name;
    newData.categoryName = venue.categories[0].name;
    newData.venue_latitude = venue.location.lat;
    newData.venue_longitude = venue.location.lng;

    console.log("Asking Firebase to get 4sq token...");

    return firebase.child(`travels/${newData.travel_id}/owner`).once("value");

  // Get owner property from travel object, get foursquare token
  }).then(function(snapshot){
    var ownerId = snapshot.val();
    return firebase.child(`users/${ownerId}/private/foursquare_token`).once("value");

  // Checkin
  }).then(function(snapshot) {
    var swarmToken = snapshot.val();

    // Skip checkin if user didn't connect their Swarm account
    if(!swarmToken) {
      console.log("No token, no checkin.");
      return new Promise(function(resolve, reject) { resolve(newData); });
    }

    console.log("Got token! Checking in..");

    return swarm.checkin(newData.venue_id, newData.venue_latitude, newData.venue_longitude, swarmToken);

  // All done (TODO save)
  }).then(function(resp) {
    return new Promise(function(resolve, reject) {
      resolve(newData);
    });
  });
};


module.exports = checkinProcessor;
