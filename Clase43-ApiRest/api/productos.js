import ProductosMongoDB from "../db/productos.js";
import DTO from "../dto/productoDTO.js";
class Productos {
	constructor() {
		this.productosMongoDB = new ProductosMongoDB();
	}

	async get() {
		let productos = await this.productosMongoDB.leer();
		return productos;
	}

	async listar(id) {
		let prod = await this.productosMongoDB.leer(id);
		return prod || { error: "producto no encontrado" };
	}
	async buscarDTO(id) {
		let prod;
		if (id) {
			prod = await this.productosMongoDB.leer(id);
			return DTO.productoSinInfo(prod);
		} else {
			prod = {};
		}
		return prod;
	}
	async listarAll() {
		let productos = await this.productosMongoDB.leer();
		return productos.length
			? productos
			: { error: "no hay productos cargados" };
	}

	async guardar(prod) {
		return await this.productosMongoDB.guardar(prod);
	}

	async actualizar(prod, id) {
		return await this.productosMongoDB.actualizar(prod, id);
	}

	async borrar(id) {
		return await this.productosMongoDB.borrar(id);
	}
}

export default Productos;
