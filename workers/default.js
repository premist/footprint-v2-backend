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

const firebase = new Firebase(process.env.FIREBASE_URL);
const queueRef = firebase.child("queues/post");

const checkinProcessor = require("./processors/checkin");

queueRef.child("specs").child("default").set({
  "in_progress_state": "default_in_progress",
  "finished_state": "default_finished",
  "timeout": 20000
}, function(e) {
  if(e) {
    console.error("An error occured while updating worker spec.");
    return;
  }

  startProcessing();
});

var startProcessing = function(e) {
  console.log("Started");

  var options = {
    "specId": "default",
    "numWorkers": 3,
    "sanitaize": true
  }

  var queue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
    console.log("New job!");

    if(data.type = "checkin") {
      checkinProcessor(data).then(function() { resolve(); }).catch(function(e) {
        console.log(e);
        reject(e);
      });
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
