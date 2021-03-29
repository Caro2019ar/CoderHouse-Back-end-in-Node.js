const mongoose = require("mongoose");

const mensCollection = "mensajes";

const MensSchema = new mongoose.Schema({
	email: { type: String, required: true },
	text: { type: String },
});

const mensajes = mongoose.model(mensCollection, MensSchema);

module.exports = { mensajes };
