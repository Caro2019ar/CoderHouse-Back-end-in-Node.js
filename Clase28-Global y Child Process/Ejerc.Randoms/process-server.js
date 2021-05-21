/* ------------------------------------------------------- */
/* --------------- USANDO EL OBJETO PROCESS -------------- */
/* ------------------------------------------------------- */
// Se creará una ruta '/randoms' que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por query params, por ej. ..../randoms?cant=20000. Si dicho parámetro no se ingresa, calcular 100000000 números.
// El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500000000 de randoms.
/* ------------------------------------------------------- */

const express = require("express");
const app = express();
const { fork } = require("child_process");
const PORT = 3000 || parseInt(process.argv[2]);

app.get("/randoms", (req, res) => {
	let cantCoder = 100000000;
	let cant = req.query.cant || cantCoder;
	let computo = fork("computo.js");
	computo.send(Number(cant));
	computo.on("message", (aleatorio) => {
		res.end(`Los valores son ${aleatorio}`);
	});
});
app.get("/", (req, res) => {
	res.end(
		"Para ver los numeros randoms, proba con la cantidad de numeros en la URL: http://localhost:3000/randoms?cant=100 "
	);
});

app.listen(PORT, (err) => {
	if (err) throw new Error(`Error en servidor: ${err}`);
	console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
