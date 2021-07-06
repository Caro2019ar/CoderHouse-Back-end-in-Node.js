const genId = {
	_id: 1,
	get id() {
		return this._id++;
	},
};
let productos = [];
export default class persistenciaMemory {
	constructor() {
		this.productos = [];
	}
	listarAll() {
		return productos;
	}
	listar(id) {
		let prodDev = this.prodPorId(id);
		return !prodDev.length ? { error: "este producto no existe" } : prodDev;
	}
	guardar(prod) {
		let id;
		prod.id = genId.id;
		productos.push(prod);
		console.log("Producto guardado", prod);
		return prod;
	}
	prodPorId(id) {
		return productos.filter((prod) => prod.id === Number(id));
	}
	actualizar(prod, id) {
		let indexAactualizar = productos.map((e) => e.id).indexOf(Number(id));
		return indexAactualizar < 0
			? { error: "Este producto no existe" }
			: ((prod.id = Number(id)), (productos[indexAactualizar] = prod), prod);
	}
	borrar(id) {
		let prodBor = this.prodPorId(id);
		return !prodBor.length
			? { error: "este producto no existe" }
			: ((productos = productos.filter((prod) => prod.id != Number(id))),
			  prodBor);
	}
}
