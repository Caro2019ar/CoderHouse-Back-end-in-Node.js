const file = "Hola mundo desde una constante más unas palabras termina";
let acum;

function getArr(file, tempo) {
	return new Promise(function (resolve) {
		const arr = file.split(" ");
		let cnt = 0;
		if (acum == undefined) {
			acum = 0;
		}
		id = setInterval(() => {
			if (!(cnt < 2)) {
				resolve(clearInterval(id));
				//Obs> resolve() no lugar certo fez a mensagem de fim aparecer no final
			}
			cnt++;
			acum = parseInt(acum);
			console.log(arr[acum++]);
		}, (tempo = 1000));
	});
	acum = acum + 1;
}

async function final() {
	//obs> esta função final não funcionava quando estava associada a uma const
	try {
		console.log("1a llamada:");
		await getArr(file, 500);
		console.log("2a llamada:");
		await getArr(file, 500);
		console.log("3a llamada:");
		await getArr(file, 500);

		console.log(`Processo completo con ${acum} palabras`);
	} catch (err) {
		console.log(err);
	}
}

final();
