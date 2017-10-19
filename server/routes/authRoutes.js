const passport = require("passport");

module.exports = app => {
  // Passport redirects request to Google for OAuth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // Specific Google account scopes for which we can request access for a user's account info
      scope: ["profile", "email"]
    })
  );

  // Passport returns authentication object and user code from Google, executes the callback in GoogleStrategy
  // Attempts to exchange the code for a user profile and accessToken
  // Once authenticated, redirects to surveys page
  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/surveys");
  });

  // Passport also attaches a logout() method to the request object
  // method removes the req.user property and clears the login session
  app.get("/api/logout", (req, res) => {
    req.logout();
    // res.send(req.user);
    res.redirect("/");
  });

  // Route for testing - to view the currently logged in user
  app.get("/api/current_user", (req, res) => {
    // returns the MongoDB user id that cookie-session extracted from cookie and Passport converted
    res.send(req.user);
  });
};
