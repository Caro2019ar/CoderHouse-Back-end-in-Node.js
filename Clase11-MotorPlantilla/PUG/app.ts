import express, { Application, Request, Response } from "express";
const app: Application = express();
const port = 8080;
const pug = require("pug");
const bodyParser = require("body-parser");
const productos = require("./rutas/productos");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/productos", productos);
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("images"));

app.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
