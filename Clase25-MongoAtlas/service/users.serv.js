const mongoose = require("mongoose");
const usermodel = require("../models/user.js");

class ManejaUser {
	guardar(usuario) {
		let userGuardar = new usermodel.users(usuario);
		userGuardar.save();
		console.log("Usuario guardado", userGuardar);
		return userGuardar;
	}
	async devNombre(nombre) {
		let userNombre = await usermodel.users
			.findOne({
				nombre: { $regex: nombre, $options: "i" },
			})
			.then((resp) => resp.nombre)
		return userNombre;
	}
}
module.exports = { ManejaUser };
