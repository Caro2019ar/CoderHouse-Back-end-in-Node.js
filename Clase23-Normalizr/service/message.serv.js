const mongoose = require("mongoose");
const mensModel = require("../models/mensajes.js");
class Maneja {
	guardar(mensaje) {
		const mensGuardar = new mensModel.mensajes(mensaje);
		mensGuardar.save();
		console.log("Mensaje guardado", mensGuardar);
		return mensGuardar;
	}
}

module.exports = { Maneja };
