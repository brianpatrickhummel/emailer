const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

// Instantiate an Express app instance as app object
const app = express();

// DATABASE
// Establish Mongoose connection to MongoDB on mLab.com using a driver via the standard MongoDB URI
mongoose.Promise = require("bluebird");
mongoose.connect(keys.mongoURI, { useMongoClient: true }).then(() => {
  console.log("Mongoose connected");
});

// MIDDLEWARES
// Run Morgan for Logging
app.use(logger("dev"));
// parse req object on http request and make body available on req.body property
app.use(bodyParser.json());
// stores session data within cookie on client-side
// also extracts data out of cookie and assigns it to req.session property
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// express loads the session data, passport.initialize accesses req.session.passport.user
app.use(passport.initialize());
// passport.session detects a serialized user, calls the deserializeUser() method
// which attaches user to req.user
app.use(passport.session());

// ROUTES
// Requires the exported functions, pass the Express App object as argument
// require statement turns into a function name which gets called, passing in App
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// Serving React assets via Express Server when in Production Environment
if (process.env.NODE_ENV === "production") {
  // For traffic that is un-routed, first look for files to serve here
  app.use(express.static("client/build"));
  // For all remaining un-routed requests, serve the React index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Dynamic PORT binding to cover both local development and Heroku Deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
