const gcloud = require("./gcloud");
const gcs = gcloud.storage();

exports.client = gcs;

exports.uploadFile = function(buffer, bucket_name, path) {
  var promise = new Promise(function(resolve, reject) {
    var bucket = gcs.bucket(bucket_name);
    var file = bucket.file(path);

    var writeStream = file.createWriteStream();

    writeStream.on("error", function(e) {
      console.log("Upload failed!");
      reject(e);
    });

    writeStream.on("finish", function() {
      file.makePublic(function(e, resp) {
        if(e) {
          console.log("Upload failed!");
          reject(e);
          return;
        }
        console.log("Upload success!");
        resolve(file);
      });
    });

    writeStream.write(buffer);
    writeStream.end();
  });

  return promise;
}
