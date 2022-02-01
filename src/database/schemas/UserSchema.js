const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: String,
  displayName: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
