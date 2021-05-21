const calculo = (max, cant) => {
	let rand = [];
	for (let i = 0; i < cant; i++) {
		let aleat = (Math.random() * max).toFixed(0);
		rand.push(aleat);
	}
	let randoms = rand.reduce(function (acc, curr) {
		if (typeof acc[curr] == "undefined") {
			acc[curr] = 1;
		} else {
			acc[curr] += 1;
		}
		return acc;
	}, {});
	return JSON.stringify(randoms);
};

process.on("message", (cantidad) => {
	const respuesta = calculo(1000, cantidad);
	process.send(respuesta);
});
