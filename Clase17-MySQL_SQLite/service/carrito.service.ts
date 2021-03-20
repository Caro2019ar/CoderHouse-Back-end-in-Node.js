import fs from "fs";

let moduloProd = require("./productos.service");
let productos = moduloProd.productos;

const genIdCarrito: any = {
	_id_carrito: 1,
	get id_carrito() {
		return this._id_carrito++;
	},
};

interface Carrito {
	id_carrito: number;
	timestamp: Date;
	producto: Producto[];
}

let carrito: any = [];
let productosCarrito: any = [];
let id_carrito: number;

class ManejaCarrito {
	guardar(id: number) {
		let productoAgregar: any = productos.filter(
			(prod: any) => prod.id === Number(id)
		);
		productosCarrito = productosCarrito.concat(productoAgregar);
		carrito.push(productosCarrito);
		!id_carrito
			? ((id_carrito = genIdCarrito.id_carrito), carrito.push(id_carrito))
			: id_carrito;
		return productosCarrito;
	}

	devCarrito(id_carr: number) {
		return !productosCarrito.length
			? { error: "No hay producto cargados" }
			: id_carrito === Number(id_carr)
			? Object.values(productosCarrito)
			: "";
	}

	vista() {
		return !productosCarrito.length
			? { error: "No hay producto cargados" }
			: Object.values(productosCarrito);
	}

	borrar(id: number) {
		return id_carrito === Number(id)
			? (productosCarrito = []) && (carrito = [])
			: "";
	}
}

module.exports = { ManejaCarrito: ManejaCarrito };
