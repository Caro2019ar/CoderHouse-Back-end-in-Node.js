const mongoose = require("mongoose");

const userCollection = "users";

const UserSchema = new mongoose.Schema({
	nombre: { type: String },
});

const users = mongoose.model(userCollection, UserSchema);
module.exports = { users };
