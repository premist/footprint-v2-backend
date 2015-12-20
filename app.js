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

// Set session key
app.keys = [process.env.SESSION_KEY];

// Configure koa application
app.use(bodyParser())
   .use(session)
   .use(grant)
   .use(koaValidate())
   .use(router.routes())
   .use(router.allowedMethods());

var startServer = function() {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("next-one-api is now running on port " + port);
}
