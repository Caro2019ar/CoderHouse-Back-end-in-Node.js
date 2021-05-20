const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const PORT = 3000 || process.env.port;

let modu = require("./service/users.serv.js");
let maneja = modu.ManejaUser;
let usuario = new maneja();

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const MONGO_DB_URI =
	"mongodb+srv://caro:12345699@cluster0.cwvci.mongodb.net/sesiones?retryWrites=true&w=majority";
// const Mongo_local = "mongodb://localhost:27017/sesiones";
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");
app.use(express.static("public"));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: MONGO_DB_URI,
			mongoOptions: advancedOptions,
		}),
		secret: "shh",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 10 },
	})
);

let person = "";
/* --------- Empezar desde el Browser ---------- */
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

app.post("/login", (req, res) => {
	let objeto = {
		nombre: req.body.user,
	};
	let guardado = usuario.guardar(objeto);
	if (req.body.user) {
		req.session.user = req.body.user;
		res.redirect("/");
	}
});

/* --------- Bienvenido ---------- */
app.get("/bienvenido", async (req, res) => {
	person = req.session.user;
	let resp = await usuario
		.devNombre(req.session.user)
		.then((respuesta) => {
			res.render("bienvenido", {
				bienvenido: respuesta,
			});
		})
		.catch((err) => {
			res.redirect("/login");
		});
});

app.get("/logout", (req, res) => {
	req.session.destroy(() => {
		res.render("hasta", { hasta: person });
	});
});

app.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`);
});

async function connectMongo() {
	const mongo = await mongoose
		.connect(MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("Mongoose connected."))
		.catch((err) => console.log(err));
}

connectMongo();
