import express, { Application, Request, Response } from "express";
const app: Application = express();

const port = 8080;

app.use(express.urlencoded({ extended: true }));

var productos = require("./rutas/productos");
app.use("/api/productos", productos);

app.get("/api/index", (req: Request, res: Response) => {
	res.sendFile(__dirname + "/index.html");
});

try {
	app.listen(port, () => {
		console.log(`Conexión al puerto ${port}`);
	});
} catch (err) {
	console.log("Error", err);
}
