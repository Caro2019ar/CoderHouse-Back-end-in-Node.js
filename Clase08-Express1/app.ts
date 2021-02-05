import express, { Application, Request, Response } from "express";
const app: Application = express();
const modulo = require("./modulo");
const port = 8080;
app.use(express.json());

app.get("/api/productos", (req: Request, res: Response) => {
	res.send(modulo.devList());
});

app.get("/api/productos/:id", (req: Request, res: Response) => {
	res.send(modulo.devProd(req.params.id));
});

app.post("/api/productos", (req: Request, res: Response) => {
	const prod = modulo.guardar({
		title: req.body.title,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
	});
	res.send(prod);
});

try {
	app.listen(port, () => {
		console.log(`Conexión al puerto ${port}`);
	});
} catch (err) {
	console.log("Error", err);
}
