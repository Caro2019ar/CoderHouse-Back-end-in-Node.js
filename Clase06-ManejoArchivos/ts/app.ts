const fs = require("fs");

class ManejaArch {
	constructor(public archivo: string) {}
	leer() {
		let productos: any = [];
		try {
			let data: any = fs.readFileSync(this.archivo, "utf-8");
			productos = JSON.parse(data);
			if (data) {
				console.log("console leer", productos);
			}
			productos = [];
		} catch (err) {
			console.log("El archivo no existe, array de productos =", productos);
		}
	}

	async guardar(prod: any) {
		let id: number;
		let dataArr: any = [];
		let productos: any;
		let data: any = await fs.readFileSync(this.archivo, "utf-8");
		productos = JSON.parse(data);
		dataArr = productos;
		prod.id = dataArr.length + 1;
		dataArr = [...dataArr, prod];
		console.log("console guardado", dataArr);

		fs.writeFileSync(this.archivo, JSON.stringify(dataArr));
	}

	async borrar() {
		const borra = await fs.unlink(this.archivo, (err: any) => {
			if (err) {
				console.log("Hubo un error");
			}
			console.log("Archivo borrado");
		});
	}
}
const archi1 = new ManejaArch("./productos.txt");
archi1.leer();
//archi1.guardar({ title: "borrador", price: 5000, thumbnail: "foto23" });
//archi1.guardar({ title: "computador", price: 100000, thumbnail: "foto100" });
//archi1.borrar();
