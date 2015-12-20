const crypto = require("crypto");

const firebase = require("../modules/firebase");
const gcloud = require("../modules/gcloud");

const gcs = gcloud.storage();

var getSignedUrl = function(bucket, path) {
  return new Promise(function(resolve, reject) {
    var bucket = gcs.bucket(process.env.NXO_GCS_BUCKET);
    var file = bucket.file(path);

    var fiveMinutesLater = new Date().getTime() + 1000*60*5;

    file.getSignedUrl({
      action: "write",
      expires: fiveMinutesLater
    }, function(e, url) {
      if(e) {
        reject(e);
        return;
      }

      resolve(url);
    });
  });
}

exports.getUploadUrl = function*(next) {
  try {
    var user = yield firebase.authWithCustomToken(this.query.token);
  } catch(e) {
    this.status = 422;
    this.body = {
      "success": false,
      "error": "Invalid token"
    }

    return;
  }

  // generate object url
  var today = new Date();
  var randomString = crypto.randomBytes(16).toString("hex");
  var imagePath = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}/${randomString}`;

  var signedUrl = yield getSignedUrl(process.env.NXO_GCS_BUCKET, imagePath);

  this.body = {signed_url: signedUrl};
}
