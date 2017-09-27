const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');


// register the Google Strategy with Passport and create a new instance of this strategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, 
  //callback where Google has returned the following account data items
  (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken: ', accessToken);
    // console.log('refreshToken: ', refreshToken);
    // console.log('profile: ', profile);
  })
)