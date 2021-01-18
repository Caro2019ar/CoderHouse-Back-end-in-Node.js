const fs = require("fs");
var arr;
function promiseReadFile(file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, function (err, data) {
			var arr = data.toString("utf-8").split(" ");
			if (err) throw err;
			else {
				resolve(file);
				(function doTempo(tempo = 1000) {
					let cnt = 0;
					// let arr = "aff bff cd ".split(" ");
					id = setInterval(() => {
						if (!(cnt < arr.length - 1)) {
							clearInterval(id);
						}
						console.log(arr[cnt++]);
					}, tempo);
				})();
			}
		});
	});
}

let promR1 = promiseReadFile("./f1.txt");
let promR2 = promiseReadFile("./f2.txt");
let promR3 = promiseReadFile("./f3.txt");

promR1
	.then(function (file1) {
		console.log(file1);
		return promR2;
	})
	.then(function (file2) {
		console.log(file2);
		return promR3;
	})
	.then(function (file3) {
		console.log(file3);
	})
	.catch(function (err) {
		console.log("fim");
	});
