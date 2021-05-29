let socket = io.connect();

socket.on("productos", function (productos) {
	//console.log(productos);
	document.getElementById("datos").innerHTML = data2TableJS(productos);
	/* data2TableHBS(productos, html => {
        document.getElementById('datos').innerHTML = html
    }) */
});

// const form = document.querySelector("form");
// form.addEventListener("submit", (e) => {
// 	e.preventDefault();

// 	const data = {
// 		title: form[0].value,
// 		price: form[1].value,
// 		thumbnail: form[2].value,
// 	};
// 	//console.log(data)

// 	fetch("/api/productos/guardar", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		method: "POST",
// 		body: JSON.stringify(data),
// 	})
// 		.then((respuesta) => respuesta.json())
// 		.then((productos) => {
// 			//console.log(productos)
// 			//document.getElementById('datos').innerHTML = data2Table(productos)
// 			form.reset();
// 			socket.emit("update", "ok");
// 		})
// 		.catch((error) => console.error(error));
// });

// function data2TableJS(productos) {
// 	let res = "";
// 	if (productos.length) {
// 		res += `
//         <style>
//             .table td, .table th {
//                 vertical-align : middle;
//             }
//         </style>
//         <h2>Lista de Productos</h2>
//         <div class="table-responsive">
//             <table class="table table-dark">
//                 <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th> </tr>
//         `;
// 		res += productos
// 			.map(
// 				(producto) => `
//                 <tr>
//                     <td>${producto.title}</td>
//                     <td>$${producto.price}</td>
//                     <td><img width="50" src="${producto.thumbnail}" alt="not found"></td>
//                 </tr>
//         `
// 			)
// 			.join(" ");
// 		res += `
//             </table>
//         </div>`;
// 	}
// 	return res;
// }

// function data2TableHBS(productos, cb) {
// 	fetch("plantillas/tabla.hbs")
// 		.then((respuesta) => respuesta.text())
// 		.then((plantilla) => {
// 			console.log("------- plantilla --------");
// 			console.log(plantilla);

// 			console.log("---------- html ----------");
// 			var template = Handlebars.compile(plantilla);
// 			let html = template({ productos });
// 			console.log(html);

// 			cb(html);
// 		});
// }

//---------------------------------------------------
// make the request to the login endpoint
function getRegister(e) {
	e.preventDefault();

	var loginUrl = "/register";
	var xhr = new XMLHttpRequest();
	var nombreElement = document.getElementById("nombre");
	var direccionElement = document.getElementById("direccion");
	var passwordElement = document.getElementById("password");
	var user = nombreElement.value;
	var direccion = direccionElement.value;
	var password = passwordElement.value;

	xhr.open("POST", loginUrl, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.addEventListener("load", function () {
		if (xhr.status == 200) {
			let token = xhr.getResponseHeader("x-auth-token");
			let responseObject = JSON.parse(this.response);
			console.log(responseObject);
			if (!responseObject.error) {
				console.log(token);
				if (token) localStorage.setItem("token", token);
				location.href = "/";
			} else {
				console.log("Error de Register");
				location.href = "/register-error";
			}
		}
		nombreElement.value = "";
		direccionElement.value = "";
		passwordElement.value = "";
	});

	var sendObject = JSON.stringify({
		nombre: user,
		direccion: direccion,
		password: password,
	});
	xhr.send(sendObject);
}

function getLogin(e) {
	e.preventDefault();

	var loginUrl = "/login";
	var xhr = new XMLHttpRequest();
	var nombreElement = document.getElementById("nombre");
	var passwordElement = document.getElementById("password");
	var user = nombreElement.value;
	var password = passwordElement.value;

	xhr.open("POST", loginUrl, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.addEventListener("load", function () {
		if (xhr.status == 200) {
			let token = xhr.getResponseHeader("x-auth-token");
			let responseObject = JSON.parse(this.response);
			console.log(responseObject);
			if (!responseObject.error) {
				console.log(token);
				if (token) localStorage.setItem("token", token);
				location.href = "/";
			} else {
				console.log("Error de login");
				location.href = "/login-error";
			}
		}
		nombreElement.value = "";
		passwordElement.value = "";
	});

	var sendObject = JSON.stringify({ nombre: user, password: password });
	xhr.send(sendObject);
}

function logOut() {
	localStorage.removeItem("token");
}

function cargarPagina(recurso, token) {
	//console.log(recurso)

	let xhr = new XMLHttpRequest();
	xhr.open("get", recurso);
	if (token) xhr.setRequestHeader("x-access-token", token);
	xhr.addEventListener("load", () => {
		if (xhr.status == 200) {
			let contenido = xhr.response;
			//console.log(contenido)
			try {
				let error = JSON.parse(contenido);
				console.log(error);
				localStorage.removeItem("token");
				location.href = "/token-error";
			} catch {
				document.querySelector("main").innerHTML = contenido;
			}
		}
	});
	xhr.send();
}

function cargarPlantilla(plantilla) {
	let token = localStorage.getItem("token");
	if (token) {
		console.log("Hay token");
		cargarPagina("/datos", token);
	} else {
		console.log("NO Hay token");
		cargarPagina("f" + plantilla + ".html");
	}
}

function logout() {
	localStorage.removeItem("token");
	location.href = "/logout";
}
