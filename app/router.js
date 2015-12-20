const router = require("koa-router")();

const usersController = require("./controllers/users_controller");

router.post("/users", usersController.create);

router.get("/", function*(next) {
  this.body = "Hello";
});

router.get("/auth/callback/foursquare", function*(next) {
  // Debug
  console.log(this.session);
  this.body = this.session;
});

module.exports = router;
