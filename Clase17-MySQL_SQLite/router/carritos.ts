import express, { Application, Request, Response } from "express";
const path = require("path");
const router = express.Router();


let moduloCarrito = require("../service/carrito.service");
let ManejaCarrito = moduloCarrito.ManejaCarrito;
let carrito = new ManejaCarrito();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const pathRoot = path.join(__dirname + "/..");

router.get("/", (req: Request, res: Response) => {
	res.render("carrito", {
		listaCarrito: carrito.vista(),
	});
});

//ver carrito por su id
router.get("/:id_carr", (req: Request, res: Response) => {
	res.render("carrito", {
		listaCarrito: carrito.devCarrito(req.params.id_carr),
	});
});

// agregar producto (por su id) al carrito
router.post("/:id", (req: Request, res: Response) => {
	const prodEnCarrito = carrito.guardar(req.params.id);
	res.send(prodEnCarrito);
});

// Eliminar un producto del carrito por su id de carrito
router.delete("/:id", (req: Request, res: Response) => {
	const arrayDelCarritoActualizado = carrito.borrar(req.params.id);
	res.send(arrayDelCarritoActualizado);
});

module.exports = router;
