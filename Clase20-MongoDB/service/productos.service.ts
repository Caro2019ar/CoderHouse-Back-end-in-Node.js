const mongoose = require("mongoose");
const productosModel = require("../models/productos.js");

class ManejaProd {
	guardar(prod: any) {
		const prodGuardar = new productosModel.productos(prod);
		prodGuardar.save();
		console.log("Producto guardado", prodGuardar);
		return prodGuardar;
	}

	async devProd(id: any) {
		let prodDev = await productosModel.productos
			.findById(id)
			.then((resp: any) => resp)
			.catch((err: any) => "Producto no encontrado");
		return prodDev;
	}

	async vista() {
		let productosDB = await productosModel.productos
			.find({})
			.then((resp: any) => resp)
			.catch((err: any) => "Productos no encontrados");
		return productosDB;
	}

	async actualizar(id: any, prod: any) {
		let prodActualizar = await productosModel.productos
			.findByIdAndUpdate(
				{ _id: id },
				{
					$set: {
						nombre: prod.nombre,
						precio: prod.precio,
						foto: prod.foto,
						descripcion: prod.descripcion,
						codigo: prod.codigo,
						stock: prod.stock,
					},
				}
			)
			.then((resp: any) => (resp = prod))
			.catch((err: any) => "Producto no encontrado");
		return prodActualizar;
	}
	async borrar(id: any) {
		let prodBorrar = await productosModel.productos
			.findByIdAndDelete(id)
			.then((resp: any) => resp)
			.catch((err: any) => "Producto no encontrado");
		return prodBorrar;
	}
}

module.exports = { ManejaProd };
