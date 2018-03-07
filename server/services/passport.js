// Passport Logic

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
// Can load a model from Mongoose by calling it (single argument, two arguments means loading something into Mongoose)
// This User object is a model class, from which new model instances can be created and saved to our database
const User = mongoose.model("users");

//mongo user passed from req.login(), user.id will be inserted into token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// cookie req.session.passport.user id is converted back into a mongoose user model instance (req.user)
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// register the Google Strategy with Passport and create a new instance of this strategy
// redirects browser to google for user to grant permission to our app
// google will redirect to callbackURL and include user code
// express server will retrieve user profile from Google and execute the callback below
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    // Verify Callback when Google has returned the following account data items
    // done is a callback function
    async (accessToken, refreshToken, profile, done) => {
      // console.log('profile: ', profile);
      // All database queries are asynchronous, results are returned via a promise
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Create a new instance/document of the User Model
      const user = await new User({ googleID: profile.id, displayName: profile.displayName }).save();
      // Call done, back to passport.authenticate which calls req.login/serializeUser();
      done(null, user);
    }
  )
);
