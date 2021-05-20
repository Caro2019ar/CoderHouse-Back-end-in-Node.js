// Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permita loguear un cliente por su nombre, mediante un formulario de ingreso.
// Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.
// Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
// Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.
//  >> Ejemplos: Se adjuntan tres screenshoot con las vistas anteriormente mencionadas.

// *-------------------------------------
const exphbs = require("express-handlebars");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000 || process.env.port;
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");
app.use(express.static("public"));
app.use(
	session({
		secret: "segredo",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 },
	})
);
let user = "";
let usuarios = [];
let person = "";

app.get("/", (req, res) => {
	if (req.session.user) {
		res.redirect("/bienvenido");
	} else {
		res.redirect("/login");
	}
});

app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/public/login.html");
});

// ---- Empezar desde http://localhost:3000/login
app.post("/login", (req, res) => {
	let { user } = req.body;
	usuarios.push(req.body);
	person = user;
	console.log(`do Post ${user}`);
	if (req.body.user) {
		req.session.user = user;
		res.redirect("/");
	}
});

/* --------- Bienvenido ---------- */
app.get("/bienvenido", (req, res) => {
	if (req.session.user) {
		res.render("bienvenido", {
			bienvenido: usuarios.find((usuario) => usuario.user == req.session.user),
		});
	} else {
		res.redirect("/login");
	}
});

// //--- Para destruir la session: http://localhost:3000/logout
app.get("/logout", (req, res) => {
	req.session.destroy(() => {
		res.render("hasta", { hasta: person });
	});
	// setTimeout(() => {
	// 	res.redirect("/");
	// }, 2000);
});

app.listen(PORT, () => {
	console.log(`Conexión al puerto 3000`);
});
