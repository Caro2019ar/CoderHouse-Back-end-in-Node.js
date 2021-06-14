import express from "express";
import Productos from "../api/productos.js";
import { getProdRandom } from "../services/generador/productos.js";
let productos = new Productos();
const router = express.Router();

// router.get("/productos/listar", async (req, res) => {
// 	res.json(await productos.listarAll());
// });

// router.get("/productos/listar/:id", async (req, res) => {
// 	let { id } = req.params;
// 	res.json(await productos.listar(id));
// });

// router.post("/productos/guardar", async (req, res) => {
// 	let producto = req.body;
// 	await productos.guardar(producto);
// 	res.json(producto);
// });

router.put("/productos/actualizar/:id", async (req, res) => {
	let { id } = req.params;
	let producto = req.body;
	await productos.actualizar(producto, id);
	res.json(producto);
});

router.delete("/productos/borrar/:id", async (req, res) => {
	let { id } = req.params;
	let producto = await productos.borrar(id);
	res.json(producto);
});

router.get("/productos/vista", async (req, res) => {
	let produs = await productos.listarAll();
	console.log("produs", produs);
	res.render("vista", {
		productos: produs,
		hayProductos: produs.length,
	});
});

router.get("/productos/vista-test", async (req, res) => {
	let cant = req.query.cant || 10;
	let prods = [];
	for (let i = 0; i < cant; i++) prods.push(getProdRandom(i + 1));

	console.log(prods);
	res.render("vista", {
		productos: prods,
		hayProductos: prods.length,
	});
});

export default router;
