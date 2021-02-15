import express, { Application, Request, Response } from "express";
const ejs = require("ejs");
var router = express.Router();
let modu = require("../modulo");
let Maneja = modu.ManejaProd;
let produ = new Maneja();
router.use(express.json());
router.use(express.static("images"));
router.use(express.urlencoded({ extended: true }));

router.get("/", (req: Request, res: Response) => {
	res.render("ingrese");
});

router.post("/", (req: Request, res: Response) => {
	const guardado = produ.guardar({
		title: req.body.title,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
	});
	res.render("ingrese");
});

router.get("/vista", (req: Request, res: Response) => {
	res.render("main", {
		lista: produ.vista(),
	});
});

router.get("/:id", (req: Request, res: Response) => {
	res.send(produ.devProd(req.params.id));
});

router.put("/actualizar/:id", (req: Request, res: Response) => {
	const actualizado = produ.actualizar(req.params.id, {
		title: req.body.title,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
	});
	res.send(actualizado);
});

router.delete("/borrar/:id", (req: Request, res: Response) => {
	res.send(produ.borrar(req.params.id));
});

module.exports = router;
