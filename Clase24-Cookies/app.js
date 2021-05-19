// Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permita loguear un cliente por su nombre, mediante un formulario de ingreso.
// Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.
// Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
// Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.
//  >> Ejemplos: Se adjuntan tres screenshoot con las vistas anteriormente mencionadas.

// *-------------------------------------

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000 || process.env.port;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(
	session({
		secret: "segredo",
		resave: false,
		saveUnitialized: false,
		cookie: { maxAge: 60000 },
	})
);
let user = "";
// ---- Empezar con GET desde http://localhost:3000/login
app.get("/login", (req, res, next) => {
	// ----- Tentando com o atributo maxAge da Cookie (não deu):
	// req.session.cookie.maxAge = 2000;
	if (!req.query.username) {
		res.send(
			"Por favor, simular login con su nombre, hacer: http://localhost:3000/login?username=(su nombre)"
		);
	} else {
		user = req.query.username;
		req.session.user = user;
		res.send("Bienvenido(a), " + user + " !");
		// setTimeout(() => {
		// 	res.redirect("/login");
		// }, 3000);
	}
});

//--- Para destruir la session: http://localhost:3000/logout
app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (!err) res.send("Hasta luego " + user + " !");
		else res.send({ status: "Logout error", body: err });
	});
});

app.listen(PORT, () => {
	console.log(`Conexión al puerto 3000`);
});
