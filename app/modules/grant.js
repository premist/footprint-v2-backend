const mount = require("koa-mount");
const Grant = require("grant-koa");

const grant = new Grant({
  "server": {
    "protocol": process.env.NXO_API_PROTOCOL || "http",
    "host": process.env.NXO_API_HOST || "localhost",
    "callback": "/link/callback",
    "transport": "session",
    "state": true
  },
  "foursquare": {
    "key": process.env.FOURSQUARE_CLIENT_ID,
    "secret": process.env.FOURSQUARE_CLIENT_SECRET,
    "callback": "/link/foursquare/callback",
    "scope": []
  }
});

module.exports = mount(grant);
