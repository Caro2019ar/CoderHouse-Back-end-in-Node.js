//***********Versão com Classe e Typescript***************** */

const genId: any = {
	_id: 1,
	get id() {
		return this._id++;
	},
};

let productos: any = [];

interface Producto {
	title: string;
	price: number;
	thumbnail: string;
	id: number;
}
class ManejaProd {
	guardar(prod: Producto) {
		if (!prod.id) prod.id = genId.id;
		productos[prod.id] = prod;
		return prod;
	}

	devProd(id: number) {
		return productos[id] || { error: "producto no encontrado" };
	}

	devList() {
		if (productos.length === 0) {
			return { error: "no hay producto cargados" };
		}
		return Object.values(productos);
	}
}
module.exports = { ManejaProd: ManejaProd };
