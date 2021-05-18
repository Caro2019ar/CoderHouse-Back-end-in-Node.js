const mongoose = require("mongoose");

const mensCollection = "mensajes";

const MensSchema = new mongoose.Schema({
	author: {
		id: { type: String },
		nombre: { type: String },
		apellido: { type: String },
		edad: { type: Number },
		alias: { type: String },
		avatar: { type: String },
	},
	text: { type: String },
});

const mensajes = mongoose.model(mensCollection, MensSchema);

module.exports = { mensajes };
