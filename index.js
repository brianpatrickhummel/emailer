const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// Establish Mongoose connection to MongoDB on mLab.com using a driver via the standard MongoDB URI
mongoose.Promise = require('bluebird');
mongoose.connect(keys.mongoURI, { useMongoClient: true }).then(() => {
  console.log("Mongoose connected");
});

const app = express();

// COOKIES
// 'cookie-session' middleware stores session data within cookie on client-side
// also extracts data out of cookie and assigns it to req.session property
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// instruct Passport to use Cookies
app.use(passport.initialize());
// passport.session calls the deserializeUser() method
app.use(passport.session());

// Requires the exported function 'authRoutes' and pass the Express App as argument
require("./routes/authRoutes")(app);

// Run Morgan for Logging
app.use(logger("dev"));

// Dynamic PORT binding to cover both local development and Heroku Deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
