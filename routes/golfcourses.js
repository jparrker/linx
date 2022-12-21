const express = require('express')
const router = express.Router()
const Review = require('../models/review')
const Golfcourse = require("../models/golfcourse")
const {isLoggedIn, isAuthor} = require('../middleware')
const golfcourses = require("../controllers/golfcourses")
const {storage} = require("../cloudinary")
const multer = require('multer')
const upload = multer({storage})

router.get("/", golfcourses.index)

router.get("/new", isLoggedIn, golfcourses.renderNewForm)


router.post("/", isLoggedIn, upload.array("image"), golfcourses.createGolfcourse)

// show route
router.get("/:id", golfcourses.showGolfcourses)

router.get('/:id/edit', isLoggedIn, isAuthor, golfcourses.renderEditForm)

router.put("/:id", isLoggedIn, isAuthor, upload.array('image'), golfcourses.updateGolfcourse)

router.delete('/:id', isLoggedIn, isAuthor, golfcourses.deleteGolfcourse );

module.exports = router

