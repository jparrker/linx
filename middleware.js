const Golfcourse = require("./models/golfcourse")
const Review = require("./models/review")

 module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    //store url they are requesting
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be signed in')
    return res.redirect("/login")
  }
  next()
}

module.exports.isAuthor = async(req, res, next) => {
  const {id} = req.params
  const golfcourse = await Golfcourse.findById(id)
  if(!golfcourse.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that')
    return res.redirect(`/golfcourse/${id}`)
  }
   next()
}

module.exports.isReviewAuthor = async(req, res, next) => {
  const {id, reviewId} = req.params
  const review = await Review.findById(reviewId)
  if(!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that')
    return res.redirect(`/golfcourse/${id}`)
  }
   next()
}