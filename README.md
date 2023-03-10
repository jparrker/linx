# Linx

Linx is a full stack web app where users can register, log in, review and rate golf courses, in addition to having the ability of adding new courses and pictures for other users to review.

**Link to project:**
https://linx.onrender.com/

<img src='https://i.imgur.com/0bt4yK3.png'>
<img src='https://i.imgur.com/Bpn9D5F.png'>
<img src='https://i.imgur.com/Jt458Cx.png'>

## How It's Made:

**Tech used:** HTML, CSS, Bootstrap, JavaScript, Node.js, Express, MongoDB

This project was created with an MVC (Model-View-Controller) architecture. I used mongoose to assist in creating schemas for our models and ejs to handle our views. Passport.js is handling the authentication for user sign-up and login, cloudinary is used to store and retrieve user uploaded image, and mapbox is used to provide maps of course locations.

## Lessons Learned:

While building this app, I learned a lot about MVC architecture - specifically in regards to routes and schemas. Having the code encapsulated and abstracted made it clearer and simpler to work with. With the backend set up and routes defined this way, we can create any front end we want.

## Optimizations

There are many features we can add to improve user experience and app loading speed. For instance, can add pagination and user profiles and the ability to search for courses based on location and rating. Also I would like to improve error handing and input validation.

## Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, mapbox, cloudinary, method-override, multer, starability

### Things to add for local build

-Run: npm install

- Create a `.env` file and place it in the config folder with the following as `key: value`
- MAPBOX_TOKEN
- PORT: 8000 (can be any port example: 3000).
- DB_STRING: `your database URI`
- Cloudinary details:
  -CLOUD_NAME
  -API_KEY
  -API_SECRET
