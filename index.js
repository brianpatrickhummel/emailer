const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// establish Mongoose connection to MongoDB on mLab.com using a driver via the standard MongoDB URI
mongoose.connect(keys.mongoURI, 
  { useMongoClient: true }
)
  .then(() => {console.log("Mongoose connected");}
);

const app = express();

// requires the exported function 'authRoutes' and pass the Express App as argument
require("./routes/authRoutes")(app);

// Run Morgan for Logging
app.use(logger("dev"));

// dynamic PORT binding to cover both local development and Heroku Deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
