import express, { Application, Request, Response } from "express";
const path = require("path");
const router = express.Router();
let modu = require("../service/productos.service.ts");
let Maneja = modu.ManejaProd;
let produ = new Maneja();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const pathRoot = path.join(__dirname + "/..");

router.get("/", (req: Request, res: Response) => {
	res.sendFile(pathRoot + "/form.html");
});

router.get("/listar", (req: Request, res: Response) => {
	const listado = produ.vista();
	res.send(listado);
});

router.get("/listar/:id", (req: Request, res: Response) => {
	const prodListado = produ.devProd(req.params.id);
	res.send(prodListado);
});

// Para adicionar produtos à lista (ADMs)
router.post("/", (req: Request, res: Response) => {
	const guardado = produ.guardar({
		nombre: req.body.nombre,
		precio: req.body.precio,
		foto: req.body.foto,
		descripcion: req.body.descripcion,
		codigo: req.body.codigo,
		stock: req.body.stock,
	});
	res.send("Producto creado");
	// res.sendFile(pathRoot + "/form.html");
});

// Atualiza o produto (ADMs)
router.put("/:id", (req: Request, res: Response) => {
	const actualizado = produ.actualizar(req.params.id, {
		nombre: req.body.nombre,
		precio: req.body.precio,
		foto: req.body.foto,
		descripcion: req.body.descripcion,
		codigo: req.body.codigo,
		stock: req.body.stock,
	});
	res.send("Producto actualizado");
});

//Apaga o prod (ADMs)
router.delete("/:id", (req: Request, res: Response) => {
	const prodBorrado = produ.borrar(req.params.id);
	res.send("Producto borrado");
});

module.exports = router;
