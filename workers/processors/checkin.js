const crypto = require("crypto");

const gcs = require("../modules/gcs");
const bucket = gcs.bucket(process.env.NXO_GCS_BUCKET);

var checkinProcessor = function(data) {
  console.log("Processing checkin..");

  var today = new Date();
  var randomString = crypto.randomBytes(16).toString("hex");
  var imagePath = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}/${randomString}`;

  return uploadImage(data.image, imagePath);
}

var uploadImage = function(base64Image, path) {
  console.log("Uploading image...");
  var binaryImage = new Buffer(base64Image, "base64");

  return gcs.uploadFile(binaryImage, bucket, path);
}

var getSwarmVenue = function() {

}

var swarmCheckin = function() {

}


module.exports = checkinProcessor;
