import express, { Application, Request, Response } from "express";
const app: Application = express();
const fs = require("fs");
const moduloDados = require("./moduloDados");
const port = 8080;

app.use(express.json());

app.get("/items", (req: Request, res: Response) => {
	res.send(moduloDados.resumoArray());
});

app.get("/item-random", (req: Request, res: Response) => {
	res.send(moduloDados.prodRand());
});

app.get("/visitas", (req: Request, res: Response) => {
	res.send(moduloDados.countVis());
});
app.listen(port, () => {
	console.log(`El servidor esta arriba en el puerto${port}`);
});
