function operacion(x: number, y: number, opera: string) {
	return new Promise((resolve, reject) => {
		switch (opera) {
			case "suma":
				import("./moduleSuma").then((e) => {
					let Suma = e.default;
					let s = new Suma(x, y);
					resolve(s.resultado());
				});
				break;
			case "resta":
				import("./moduleResta").then((e) => {
					let Resta = e.default;
					let s = new Resta(x, y);
					resolve(s.resultado());
				});
				break;
			default:
				reject(console.log("...Erro na operação."));
				break;
		}
	});
}

async function Operaciones(x: number, y: number, opera: string) {
	try {
		let resultado = await operacion(x, y, opera);
		console.log(resultado);
	} catch (error) {
		console.log(`${error}`);
	}
}
