require("dotenv").config({ silent: true });

const koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = koa();

const grant = require("./app/modules/grant");
const session = require("./app/modules/session");
const router = require("./app/router");

app.keys = [process.env.SESSION_KEY];

app.use(bodyParser())
   .use(session)
   .use(grant)
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
