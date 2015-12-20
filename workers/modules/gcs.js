const request = require("request");
const gcloud = require("./gcloud");
const gcs = gcloud.storage();

exports.client = gcs;

exports.uploadFile = function(buffer, bucket_name, path) {
  var fullPath = `https://${bucket_name}.storage.googleapis.com/${path}`;
  var bucket = gcs.bucket(bucket_name);
  var file = bucket.file(path);

  return gcsGetSignedUrl(file, {
    action: "write",
    expires: "2020-01-01",
    contentType: "image/jpeg"
  }).then(function(url) {
    return uploadBuffer(buffer, url);
  }).then(function(url) {
    return gcsMakePublic(file);
  }).then(function(file) {
    return new Promise(function(resolve, reject) {
      resolve(fullPath);
    });
  });
}

var gcsGetSignedUrl = function(file, options) {
  return new Promise(function(resolve, reject) {
    file.getSignedUrl(options, function(e, url) {
      if(e) { reject(e); }
      resolve(url);
    });
  });
}

var gcsMakePublic = function(file) {
  return new Promise(function(resolve, reject) {
    file.makePublic(function(e, resp) {
      if(e) { reject(e); }
      resolve(file);
    });
  });
}

var uploadBuffer = function(buffer, url) {
  return new Promise(function(resolve, reject) {
    request({
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg"
      },
      url: url,
      body: buffer
    }, function(e, resp, body) {
      if(e) { reject(e); }
      resolve(url);
    });
  });
}
