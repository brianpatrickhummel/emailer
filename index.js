const express = require('express');
const logger = require('morgan');

const app = express();

// Run Morgan for Logging
app.use(logger("dev"));

 
app.get('/', (req, res) => {
  res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;     // dynamic PORT binding
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});