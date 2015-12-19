const mount = require("koa-mount");
const Grant = require("grant-koa");

const grant = new Grant({
  "server": {
    "protocol": process.env.NXO_API_PROTOCOL || "http",
    "host": process.env.NXO_API_HOST || "localhost",
    "callback": "/auth/callback",
    "transport": "session",
    "state": true
  },
  "foursquare": {
    "key": process.env.FOURSQUARE_CLIENT_ID,
    "secret": process.env.FOURSQUARE_CLIENT_SECRET,
    "callback": "/auth/callback/foursquare",
    "scope": []
  }
});

module.exports = mount(grant);
