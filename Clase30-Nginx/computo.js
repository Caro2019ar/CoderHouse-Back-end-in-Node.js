
function calculo(cant) {
	let randoms = {};
	for (let i = 0; i < cant; i++) {
		let random = parseInt(Math.random() * 1000) + 1;
		if (!randoms[random]) randoms[random] = 1;
		else randoms[random]++;
	
	}
	return randoms;
}

process.on("message", (message) => {
	process.send({ id: message.id, ...calculo(message.data) });
});
console.log(`PID CHILD_PROCESS FORK ${process.pid}`);
