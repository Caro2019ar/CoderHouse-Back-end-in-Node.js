import express, { Application, Request, Response } from "express";
const app: Application = express();
const port = 8080;
var productos = require("./rutas/productos");
app.use("/api/productos", productos);
app.use(express.json());

const handlebars = require("express-handlebars");

app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/",
	})
);

app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static("images"));

try {
	app.listen(port, () => {
		console.log(`Conexión al puerto ${port}`);
	});
} catch (err) {
	console.log("Error", err);
}

// Calculadora
// https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png
// Globo
// https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png
// Reloj
// https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png
// Escuadra
// https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png
