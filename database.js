const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/usercrudapp").then(() => {
  console.log("working");
});

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Usermodel = mongoose.model("User", Schema);
module.exports = Usermodel;
