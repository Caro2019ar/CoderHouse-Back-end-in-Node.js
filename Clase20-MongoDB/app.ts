import express, { Application, Request, Response } from "express";
const app: Application = express();
const port = process.env.PORT || 8080;
const pug = require("pug");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const productosModel = require("./models/productos.js");
const mensModel = require("./models/mensajes.js");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

let productos = require("./router/productos");
app.use("/productos", productos);


app.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});

connectMongo();
async function connectMongo() {
	try {
		const URL = "mongodb://localhost:27017/prueba_db";
		let rta = await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log("Base de datos con mongoose");
	} catch (err) {
		console.log(err);
	}
}
