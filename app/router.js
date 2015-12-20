const router = require("koa-router")();

const linkController = require("./controllers/link_controller");

router.get("/", function*(next) {
  this.body = "Hello";
});

router.get("/link/foursquare", linkController.foursquare);
router.get("/link/foursquare/callback", linkController.foursquareCallback);

module.exports = router;
