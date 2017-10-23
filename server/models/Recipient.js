// Survey Subdocument collection

const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  responded: {
    type: Boolean,
    default: false
  }
});

// Rather than creating a model and registering it with Mongoose
module.exports = recipientSchema;
