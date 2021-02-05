const file1 = "1Hola 1desde 1una 1constante";
const file2 = "2Hola 2desde 2una 2constante";
const file3 = "3Hola 3desde 3una 3constante";

const fn = (file, time = 1000, callback) => {
	const arr = file.split(" ");
	let cnt = 0;
	let id = setInterval(
		(words) => {
			if (cnt < words.length) {
				console.log(words[cnt]);
				cnt++;
			} else {
				clearInterval(id);
				callback(arr.length);
			}
		},
		time,
		arr
	);
};

fn(file1, 500, (count) => {let totalCount = count;
	fn(file2, 500, (count) => {totalCount += count;
		fn(file3, 500, (count) => {totalCount += count;
			console.log(`Processo completo con ${totalCount} palabras`);
		});
	});
});
