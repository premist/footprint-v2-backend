const url = require("url");
const session = require("koa-generic-session");
const redis = require("redis");
const redisStore = require("koa-redis");

const redisClient = redis.createClient(process.env.REDIS_URL);

module.exports = session({
  store: redisStore({ "client": redisClient })
});
