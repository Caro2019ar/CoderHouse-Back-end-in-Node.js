const fs = require("fs");
const path = require("path");
let pathProductos = path.join(
	__dirname + "/.." + "/repository/productosCadastrados.json"
);

fs.writeFileSync(pathProductos, JSON.stringify([]));

const genId = {
	_id: 1,
	get id() {
		return this._id++;
	},
};
interface Producto {
	id: number;
	// timestamp: number;
	nombre: string;
	descripcion: string;
	codigo: string;
	precio: number;
	foto: string;
	stock: number;
}

let productos: any = [];
class ManejaProd {
	guardar(prod: Producto) {
		let id: number;
		prod.id = genId.id;
		productos.push(prod);
		fs.writeFileSync(
			pathProductos,
			JSON.stringify(productos)
		);
		console.log("Producto guardado", prod);
		return prod;
	}
	prodPorId(id: number) {
		return productos.filter((prod: Producto) => prod.id === Number(id));
	}

	devProd(id: number) {
		let prodDev = this.prodPorId(id);
		return !prodDev.length ? { error: "este producto no existe" } : prodDev;
	}

	vista() {
		return !productos.length
			? { error: "No hay producto cargados" }
			: (console.log("vista", productos), Object.values(productos));
	}
	actualizar(id: number, prod: Producto) {
		let indexAactualizar = productos.map((e: any) => e.id).indexOf(Number(id));
		return indexAactualizar < 0
			? { error: "Este producto no existe" }
			: ((prod.id = Number(id)), (productos[indexAactualizar] = prod), prod);
	}
	borrar(id: number) {
		let prodBor = this.prodPorId(id);
		return !prodBor.length
			? { error: "este producto no existe" }
			: ((productos = productos.filter(
					(prod: Producto) => prod.id != Number(id)
			  )),
			  prodBor);
	}
}

module.exports = { ManejaProd, productos };
