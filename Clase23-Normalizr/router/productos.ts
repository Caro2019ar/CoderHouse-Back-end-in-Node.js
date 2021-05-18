// import express, { Application, Request, Response } from "express";
// const path = require("path");
// const router = express.Router();
// let modu = require("../service/productos.service.ts");
// let Maneja = modu.ManejaProd;
// let produ = new Maneja();
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// const pathRoot = path.join(__dirname + "/..");

// router.get("/", (req: Request, res: Response) => {
// 	res.sendFile(pathRoot + "/form.html");
// });

// router.get("/listar", async (req: Request, res: Response) => {
// 	const listado = await produ.vista();
// 	res.send(listado);
// });

// router.get("/listar/:id", async (req: Request, res: Response) => {
// 	const prodListado = await produ.devProd(req.params.id);
// 	res.send(prodListado);
// });

// router.get("/nombre", async (req: Request, res: Response) => {
// 	const prodListadoNombre = await produ.devProdNombre(req.query.nombre);
// 	res.send(prodListadoNombre);
// });

// router.get("/precio", async (req: Request, res: Response) => {
// 	const prodListadoPrecio = await produ.devProdPrecio(req.query.precio);
// 	res.send(prodListadoPrecio);
// });

// router.get("/stock", async (req: Request, res: Response) => {
// 	const prodListadoStock = await produ.devProdStock(req.query.stock);
// 	res.send(prodListadoStock);
// });

// // Para adicionar produtos à lista (ADMs)
// router.post("/", (req: Request, res: Response) => {
// 	const guardado = produ.guardar({
// 		nombre: req.body.nombre,
// 		precio: req.body.precio,
// 		foto: req.body.foto,
// 		descripcion: req.body.descripcion,
// 		codigo: req.body.codigo,
// 		stock: req.body.stock,
// 	});
// 	res.send("Producto creado");
// });

// // Atualiza o produto (ADMs)
// router.put("/:id", async (req: Request, res: Response) => {
// 	const actualizado = await produ.actualizar(req.params.id, {
// 		nombre: req.body.nombre,
// 		precio: req.body.precio,
// 		foto: req.body.foto,
// 		descripcion: req.body.descripcion,
// 		codigo: req.body.codigo,
// 		stock: req.body.stock,
// 	});
// 	res.send("Producto actualizado");
// });

// //Apaga o prod (ADMs)
// router.delete("/:id", async (req: Request, res: Response) => {
// 	const prodBorrado = await produ.borrar(req.params.id);
// 	res.send(prodBorrado);
// });

// module.exports = router;
