const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const logger = require("morgan");
const keys = require('./config/keys');

const app = express();

// register the Google Strategy with Passport and create a new instance of this strategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret
  })
);

// Run Morgan for Logging
app.use(logger("dev"));

// dynamic PORT binding to cover both local development and Heroku Deployment
const PORT = process.env.PORT || 5000; 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
