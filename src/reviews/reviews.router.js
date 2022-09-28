const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

//route to reviews
router.route("/")
.get(controller.list)
.all(methodNotAllowed)


//route for /:reviewId allows for the HTML URL to be modified to look for and input a specific review id
router.route("/:reviewId")
.put(controller.update)
.delete(controller.delete)
.all(methodNotAllowed)

module.exports = router;