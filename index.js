const express = require("express");
const logger = require("morgan");
require('./services/passport');

const app = express();

// requires the exported function 'authRoutes' and pass the Express App as argument
require('./routes/authRoutes')(app);

// Run Morgan for Logging
app.use(logger("dev"));

// dynamic PORT binding to cover both local development and Heroku Deployment
const PORT = process.env.PORT || 5000; 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
