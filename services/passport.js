const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
// Can load a model from Mongoose by calling it (single argument, two arguments means loading something into Mongoose)
// This User object is a model class, from which new model instances can be created and saved to our database
const User = mongoose.model("users");

// the mongoose user model instance is converted into an id for insertion into token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// cookie user id is converted back into a mongoose user model instance (req.user)
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// register the Google Strategy with Passport and create a new instance of this strategy
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
    (accessToken, refreshToken, profile, done) => {
      // console.log('profile: ', profile);
      // All database queries are asynchronous, results are returned via a promise
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
