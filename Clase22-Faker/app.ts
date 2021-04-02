import express, { Application, Request, Response } from "express";
const app: Application = express();
const port = process.env.PORT || 8080;
const faker = require("faker");
const productos = require("./router/productos");

app.use(express.json());
app.use("/productos", productos);

app.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
