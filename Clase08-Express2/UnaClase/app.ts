//****************Versão com Classe ******************** */

import express, { Application, Request, Response } from "express";
const app: Application = express();
const port = 8080;
app.use(express.json());

let modu = require("./modulo");
let Maneja = modu.ManejaProd;
let produ = new Maneja();

app.get("/api/productos", (req: Request, res: Response) => {
	res.send(produ.devList());
});

app.get("/api/productos/:id", (req: Request, res: Response) => {
	res.send(produ.devProd(req.params.id));
});

app.post("/api/productos", (req: Request, res: Response) => {
	const guardado = produ.guardar({
		title: req.body.title,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
	});
	res.send(guardado);
});

try {
	app.listen(port, () => {
		console.log(`Conexión al puerto ${port}`);
	});
} catch (err) {
	console.log("Error", err);
}
