import express, { Application, Request, Response } from "express";

var router = express.Router();
let modu = require("../modulo");
let Maneja = modu.ManejaProd;
let produ = new Maneja();

// router is now http://localhost:8080/api/productos

router.get("/", (req: Request, res: Response) => {
	res.send(produ.devList());
});

router.get("/:id", (req: Request, res: Response) => {
	res.send(produ.devProd(req.params.id));
});

router.put("/actualizar/:id", (req: Request, res: Response) => {
	const actualizado = produ.actualizar(req.params.id, {
		title: req.body.title,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
		id: req.params.id,
	});
	res.send(actualizado);
});

router.delete("/borrar/:id", (req: Request, res: Response) => {
	res.send(produ.borrar(req.params.id));
});

router.post("/ind", (req: Request, res: Response) => {
	const guardado = produ.guardar({
		title: req.body.title,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
	});
	res.send(guardado);
});
module.exports = router;
