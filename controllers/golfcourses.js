const { cloudinary } = require("../cloudinary");
const Golfcourse = require("../models/golfcourse");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const golfcourses = await Golfcourse.find({});
  res.render("golfcourses/index", { golfcourses });
  console.log(golfcourses);
};

module.exports.renderNewForm = (req, res) => {
  res.render("golfcourses/new");
};

module.exports.createGolfcourse = async (req, res) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.golfcourse.location,
      limit: 1,
    })
    .send();
  const golfcourse = new Golfcourse(req.body.golfcourse);
  golfcourse.geometry = geoData.body.features[0].geometry;
  golfcourse.image = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  golfcourse.author = req.user._id;
  await golfcourse.save();
  console.log(golfcourse);
  req.flash("success", "Successfully added a course!");
  res.redirect(`/golfcourses/${golfcourse._id}`);
};

module.exports.showGolfcourses = async (req, res) => {
  const golfcourse = await Golfcourse.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  if (!golfcourse) {
    req.flash("error", "Cannot find that course");
    return res.redirect("/golfcourses");
  }
  res.render("golfcourses/show", { golfcourse });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const golfcourse = await Golfcourse.findById(req.params.id);
  if (!golfcourse) {
    req.flash("error", "Cannot find that Golfcourse!");
    return res.redirect("/golfcourse");
  }

  res.render("golfcourses/edit", { golfcourse });
};

module.exports.updateGolfcourse = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const golfcourse = await Golfcourse.findByIdAndUpdate(id, {
    ...req.body.golfcourse,
  });

  const imgs = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  golfcourse.image.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
      console.log(filename);
    }
    await golfcourse.updateOne({
      $pull: {
        image: {
          filename: {
            $in: req.body.deleteImages,
          },
        },
      },
    });
  }

  req.flash("success", "Successfully updated golfcourse!");
  res.redirect(`/golfcourses/${golfcourse._id}`);
};

module.exports.deleteGolfcourse = async (req, res) => {
  const { id } = req.params;
  await Golfcourse.findByIdAndDelete(id);
  res.redirect("/golfcourses");
};
