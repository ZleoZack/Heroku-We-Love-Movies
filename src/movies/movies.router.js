const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

router.route("/:movieId/theaters")
.get(controller.movieIdTheater)
.all(methodNotAllowed)

router.route("/:movieId/reviews")
.get(controller.movieIdReviews)
.all(methodNotAllowed)

router.route("/")
.get(controller.list)
.all(methodNotAllowed)

router.route("/:movieId")
.get(controller.read)
.all(methodNotAllowed)

module.exports = router;