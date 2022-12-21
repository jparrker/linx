
require('dotenv').config({path: './config/.env'})
const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const Golfcourse = require("./models/golfcourse")
const ejsMate = require('ejs-mate')
const Review = require('./models/review')
const golfcourses = require("./routes/golfcourses")
const reviews = require('./routes/reviews')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const userRoutes = require('./routes/users')
const MongoStore = require("connect-mongo") 


mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected")
})


const app = express()

app.engine('ejs', ejsMate)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.set("view engine", 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

const store = MongoStore.create({
  mongoUrl: process.env.DB_STRING, 
  secret: 'keyboard cat',
  touchAfter: 24*3600
})

store.on('error', function(e) {
  console.log('Session store error', e)
})
const sessionConfig  = {
  store: store,
  name: 'session',
  secret: 'thisisthesecret',
  resave: false, 
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true, 
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
  
}



app.use(session(sessionConfig))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash("error")

  next()
})

app.use("/golfcourses", golfcourses)
app.use("/golfcourses/:id/reviews", reviews)
app.use("/", userRoutes)



app.get("/", (req, res) => {
  res.render('home')
})
const port  = process.env.PORT || 2121
app.listen(port, () => {
  console.log(`server up on ${port}`)
})