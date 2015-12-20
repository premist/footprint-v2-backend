const router = require("koa-router")();

const linkController = require("./controllers/link_controller");
const mediaController = require("./controllers/media_controller");

router.get("/", function*(next) {
  this.body = "Hello";
});

router.get("/link/foursquare", linkController.foursquare);
router.get("/link/foursquare/callback", linkController.foursquareCallback);

router.get("/link/twitter", linkController.twitter);
router.get("/link/twitter/callback", linkController.twitterCallback);

router.get("/media/signed_url", mediaController.getUploadUrl);

module.exports = router;
