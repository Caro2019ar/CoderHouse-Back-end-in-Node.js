const genId = {
	_id: 1,
	get id() {
		return this._id++;
	},
};

interface Producto {
	title: string;
	price: number;
	thumbnail: string;
	id: number;
}

let productos: any = [];
class ManejaProd {
	guardar(prod: Producto) {
		let id: number;
		prod.id = genId.id;
		productos.push(prod);
		console.log("Producto guardado", prod);
		return prod;
	}
	prodPorId(id: number) {
		return productos.filter((prod: Producto) => prod.id === Number(id));
	}

	devProd(id: number) {
		let prodDev = this.prodPorId(id);
		if (!prodDev.length) {
			return { error: "este producto no existe" };
		}
		return prodDev;
	}

	vista() {
		if (!productos.length) {
			return { error: "No hay producto cargados" };
		}
		console.log("vista", productos);
		return Object.values(productos);
	}
	actualizar(id: number, prod: Producto) {
		let indexAactualizar = productos.map((e: any) => e.id).indexOf(Number(id));
		if (indexAactualizar < 0) {
			return { error: "Este producto no existe" };
		}
		prod.id = Number(id);
		productos[indexAactualizar] = prod;
		return prod;
	}
	borrar(id: number) {
		let prodBor = this.prodPorId(id);
		if (!prodBor.length) {
			return { error: "este producto no existe" };
		}
		productos = productos.filter((prod: Producto) => prod.id != Number(id));
		return prodBor;
	}
}

module.exports = { ManejaProd: ManejaProd };
