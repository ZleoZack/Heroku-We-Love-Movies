const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");


async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId)
    if(movie){
        res.locals.movie = movie;
        return next();
    } else {
        next({ status: 404, message: "Movie cannot be found."})
    }
}

async function read(req, res, next){
res.json({ data: res.locals.movie });
}

async function list(req, res, next){
    const {is_showing} = req.query;
    if(is_showing === 'true'){
        res.json({ data: await moviesService.showingList(is_showing)})
    }

    res.json({ data: await moviesService.list() });
}

// movies/:movieId/theaters route for access using the service file and the readTheatre function async await for manipulating the data from the promise object
async function movieIdTheater(req, res, next){
    const movie_id = req.params.movieId
    const theaterReview = await moviesService.readTheater(movie_id)
    res.json({ data: theaterReview })
}

// movies/:movieId/reviews route for access using the service file and the readReviews function async await for instructing the promise 
async function movieIdReviews(req,res, next){
    const movie_id = req.params.movieId
    const reviewList = await moviesService.readReviews(movie_id)
    res.json({ data: reviewList })
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    movieIdTheater: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieIdTheater)],
    movieIdReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieIdReviews)]
}
