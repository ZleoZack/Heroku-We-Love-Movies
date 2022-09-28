if (process.env.USER) require("dotenv").config();
const express = require("express");
const errorHandler = require("./utils/errors/errorHandler");
const notFound = require("./utils/errors/notFound");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const cors = require("cors");

const app = express();

//routes

app.use(cors());

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//routes for error handling/ 404 not found requests, app.use(highest priority when being invoked in the app file, these routes will always be checked through)


app.use(notFound);
app.use(errorHandler);

module.exports = app;
