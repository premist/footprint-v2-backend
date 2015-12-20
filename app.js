require("dotenv").config({ silent: true });

const fs = require("fs");
const path = require("path");

const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaValidate = require("koa-validate");

const app = koa();

const router = require("./app/router");
const grant = require("./app/modules/grant");
const session = require("./app/modules/session");
const db = require("./app/modules/db");

// Load models
var modelsPath = path.join(__dirname, "app/models");
fs.readdirSync(modelsPath)
  .forEach(file => require(path.join(modelsPath, file)));

// Set session key
app.keys = [process.env.SESSION_KEY];

// Configure koa application
app.use(bodyParser())
   .use(session)
   .use(grant)
   .use(koaValidate())
   .use(router.routes())
   .use(router.allowedMethods());

db.on("error", function (e) {
  console.log("Error while connecting to the database.");
  console.log(e);
}).once("open", function() {
  console.log("Established MongoDB connection.");
  startServer();
});

var startServer = function() {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("next-one-api is now running on port " + port);
}
