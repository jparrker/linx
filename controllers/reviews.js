const Golfcourse = require("../models/golfcourse")
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
 
  const golfcourse = await Golfcourse.findById(req.params.id)
  const review = new Review(req.body.review)
  golfcourse.reviews.push(review)
  console.log(req.body.review)
  review.author = req.user._id
  await review.save()
  await golfcourse.save()
  req.flash('success', 'Created new review!')
  res.redirect(`/golfcourses/${golfcourse._id}`)
}


module.exports.deleteReview = async(req, res) => {
  const {id, reviewId} = req.params
  Golfcourse.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/golfcourses/${id}`)
}


