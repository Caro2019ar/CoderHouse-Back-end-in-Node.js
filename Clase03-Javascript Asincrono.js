const fs = require("fs");
const file = "Hola mundo desde archivo file";

getArr(file, (resultado, tempo) => {
	arr = resultado;
	console.log(arr);
	let cnt = 0;
	id = setInterval((resultado) => {
		if (!(cnt < arr.length - 1)) {
			clearInterval(id);
		}
		console.log(arr[cnt++]);
	}, (tempo = 1000));
});

function getArr(file, callback) {
	return new Promise(function (resolve, reject) {
		let arr = file.split(" ");
		return callback(arr);
	});
}
