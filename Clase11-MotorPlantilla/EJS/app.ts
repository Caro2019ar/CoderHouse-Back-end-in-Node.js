import express, { Application, Request, Response } from "express";
const app: Application = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = 8080;
const productos = require("./rutas/productos");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/productos", productos);

app.set("view engine", "ejs");

app.use(express.static("images"));

app.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
