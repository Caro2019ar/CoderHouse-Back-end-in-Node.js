const mongoose = require("mongoose");

const prodCollection = "productos";

const ProdSchema = new mongoose.Schema(
	{
		nombre: { type: String, require: true },
		descripcion: { type: String },
		codigo: { type: String },
		precio: { type: Number },
		foto: { type: String },
		stock: { type: Number },
	},
	{ timestamps: { createdAt: "timestamp", updatedAt: false } },
	{ versionKey: false }
);

const productos = mongoose.model(prodCollection, ProdSchema);
module.exports = { productos };
