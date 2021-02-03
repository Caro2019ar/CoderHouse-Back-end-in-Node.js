const fs = require("fs");
let arrProductos;
let visRand = 0;
let visResu = 0;

try {
	const data = fs.readFileSync("./productos.txt", "utf-8");
	arrProductos = JSON.parse(data);
} catch (err) {
	console.log("Erro al leer archivo");
}

function resumoArray() {
	let arrResum = {};
	arrProductos.forEach(function (d) {
		arrResum.hasOwnProperty(d.title)
			? (arrResum[d.title] = arrResum[d.title] + 1)
			: (arrResum[d.title] = 1);
	});
	visResu++;
	return arrResum;
}

function prodRand() {
	let min = 0;
	let numRand = Math.floor(Math.random() * (arrProductos.length - min) + min);
	let prodRand = arrProductos[numRand]["title"];
	let resp = `{item: ${prodRand} }`;
	visRand++;
	return resp;
}

function countVis() {
	let conta = `{visitas: {items: ${visResu} item-random: ${visRand} }`;
	return conta;
}

module.exports = { resumoArray, prodRand, countVis };
