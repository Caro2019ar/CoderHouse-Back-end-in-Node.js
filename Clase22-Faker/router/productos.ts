import express, { Application, Request, Response } from "express";
const router = express.Router();
const faker = require("faker");

router.use(express.json());

router.get("/vista-test", (req: Request, res: Response) => {
	let cantQuery: Number;
	let resultado: any = [];
	if (Number(req.query.cant) == 0) {
		resultado = "No hay productos";
	}
	cantQuery = req.query.cant == null ? 10 : Number(req.query.cant);
	for (let i = 0; i < cantQuery; i++) {
		const user: any = {
			nombre: faker.commerce.productName(),
			precio: faker.commerce.price(),
			foto: faker.image.imageUrl(),
		};
		resultado.push(user);
	}
	res.send(resultado);
});

module.exports = router;
