const passport = require('passport');


module.exports = (app) => {

  // Passport will authenticate via GoogleStrategy
  app.get('/auth/google', 
  passport.authenticate('google', {
  // specific Google account scopes for which we can request access for a user's account info 
    scope: ['profile', 'email']
  })
  )

  // Passport returns authentication object and user code from Google, executes the callback in GoogleStrategy
  app.get('/auth/google/callback', passport.authenticate('google'));

};