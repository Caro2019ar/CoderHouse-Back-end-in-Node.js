import express, { Application, Request, Response } from "express";
const app: Application = express();
const port = process.env.PORT || 8080;
const pug = require("pug");
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

var productos = require("./router/productos");
app.use("/productos", productos);
var carritos = require("./router/carritos");
app.use("/carritos", carritos);

app.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
