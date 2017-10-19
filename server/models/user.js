const mongoose = require("mongoose");
// Create the Schema class
const { Schema } = mongoose; // rather than const schema = mongoose.Schema;
// states....the mongoose object has a property called Schema, take that property and assign it to a new variable called Schema
// Schema is an object that defines the structure of any documents that will be stored in your MongoDB collection; it enables you to define types and validators for all of your data items.

// Instantiate a userSchema object with the Schema class
const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  }
});

// Create a "users" model with the userSchema schema and loads the schema into Mongoose
// Model is an object that gives you easy access to a named collection, allowing you to query the collection and use the Schema to validate any documents you save to that collection. It is created by combining a Schema, a Connection, and a collection name ("users").
mongoose.model("users", userSchema);
