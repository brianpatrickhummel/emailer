// determine if server is running dev or prod environment and supply proper app credentials
// heroku will assign the string "production" to the NODE_ENV environment variable
if (process.env.NODE_ENV === "production") {
  // production environment, return prod keys
  module.exports = require('./prod');
} else {
  // development environment, return dev keys
  module.exports = require('./dev');
}
