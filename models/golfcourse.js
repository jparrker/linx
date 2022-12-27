const mongoose = require("mongoose")
const Schema  = mongoose.Schema
const Review = require("./review")

const opts = {toJSON: {virtuals: true}}


const ImageSchema = new Schema ({
  url: String,
  filename: String
})

ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace("/upload", "/upload/w_200")
})



const CourseSchema = new Schema({
  title: String,
  image: [ImageSchema],
  geometry: {
    type:  {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }

  },
  price: Number, 
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
}, opts)

CourseSchema.virtual('properties.popUpText').get(function() {
  return `<a href="/courses/${this._id}">${this.title} </a>
  <p>${this.description.substring(0, 40)}...</p>`
})

CourseSchema.post('findOneAndDelete', async function(doc) {
  if(doc) {
    await Review.remove({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model("Golfcourse", CourseSchema)