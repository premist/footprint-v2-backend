/*
  Request JSON example:
  {
    "type": "checkin",
    "image": "/9j/...",
    "content": "hello~~",
    "venue_id": "49b15db9f964a520d5521fe3"
  }
*/


require("dotenv").config({ silent: true });

const Queue = require("firebase-queue");
const Firebase = require("firebase");

var firebase = new Firebase(process.env.FIREBASE_URL);
var queueRef = firebase.child("queues/post");

queueRef.child("specs").child("default").set({
  "in_progress_state": "default_in_progress",
  "finished_state": "default_finished",
  "timeout": 20000
}, startProcessing);

var startProcessing = function(e) {
  if(e) {
    console.error("An error occured while updating worker spec.");
    return;
  }

  var options = {
    "specId": "default",
    "numWorkers": 3,
    "sanitaize": true
  }

  var queue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
    if(data.type = "checkin") {
      processCheckin(data).then(function() { resolve(); });
    }
    else {
      reject();
    }
  });

  process.on("SIGINT", function() {
    console.log("Starting queue shutdown");
    queue.shutdown().then(function() {
      console.log("Finished queue shutdown");
      process.exit(0);
    });
  });
};

var processCheckin(data) {
  var promise = new Promise(function(resolve, reject) {
    // TODO
  });

  return promise;
}
