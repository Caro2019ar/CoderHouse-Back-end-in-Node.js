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
		let id;
		if (!prod.id) prod.id = genId.id;
		productos[prod.id] = prod;
		console.log("Producto guardado", prod);
		return prod;
	}

	devProd(id: number) {
		return productos[id] || { error: "Producto no encontrado" };
	}

	devList() {
		if (productos.length === 0) {
			return { error: "No hay producto cargados" };
		}
		console.log(productos);
		return Object.values(productos);
	}
	actualizar(id: number, prod: Producto) {
		if (!productos[id]) {
			return { error: "Este producto no existe" };
		}
		prod.id = Number(id);
		productos[id] = prod;
		console.log("Producto actualizado", prod);
		return prod;
	}
	borrar(id: number) {
		let prodElim = productos[id];
		if (!productos[id]) {
			return { error: "este producto no existe" };
		}
		productos = productos.filter((prod: Producto) => prod.id != Number(id));
		console.log("Producto eliminado", prodElim);
		return prodElim;
	}
}

module.exports = { ManejaProd: ManejaProd };
