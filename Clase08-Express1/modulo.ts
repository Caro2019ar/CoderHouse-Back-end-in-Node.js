module.exports = { guardar, devProd, devList };

let productos: any = [];
const genId: any = {
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

function guardar(prod: Producto) {
	if (!prod.id) prod.id = genId.id;
	productos[prod.id] = prod;
	return prod;
}

function devProd(id: number) {
	return productos[id] || { error: "producto no encontrado" };
}

function devList() {
	if (productos.length === 0) {
		return { error: "no hay producto cargados" };
	}
	return Object.values(productos);
}
