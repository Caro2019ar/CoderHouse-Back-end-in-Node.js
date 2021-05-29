import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import Productos from "./api/productos.js";
import Mensajes from "./api/mensajes.js";
import { MongoDB } from "./db/db.js";
import { getProdRandom } from "./generador/productos.js";
import { Server as Socket } from "socket.io";
import os from "os";
import cluster from "cluster";
// import { fork } from "child_process";
import jwt from "jsonwebtoken";
import { generateAuthToken, auth } from "./jwt.js";
let usuarios = [];
const numCPUs = os.cpus().length;
const app = express();
const server = http.Server(app);
const io = new Socket(server);

const PORT = process.env.PORT || 8080;

let productos = new Productos();
let mensajes = new Mensajes();

//----------------------------------------------------------------------
// COMPRESIÓN
//----------------------------------------------------------------------
// import compression from "compression";
// app.use(compression());
//--------------------------------------------
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "main.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");
//--------------------------------------------

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
//----------------------------------------------------------------------
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://caro:12345699@cluster0.cwvci.mongodb.net/passport?retryWrites=true&w=majority",

			ttl: 600,
		}),
		secret: "shhhhhhhhhhhhhhhhhhhhh",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 600000,
		},
	})
);
//----------------------------------------------------------------------
// LOGGERS
//----------------------------------------------------------------------
import pino from "pino";
const pinoInfo = pino();
const pinoWarn = pino("./logs/warn.log");
const pinoError = pino("./logs/error.log");

//const loggerInfo = pinoInfo.info("info");
// const loggerWarn = pinoWarn.warn("warn");
// const loggerError = pinoError.error("error");

/* -------------------------------------------------------- */
/* -------------- LOGIN y LOGOUT con JWT ------------------ */
/* -------------------------------------------------------- */
app.get("/login", (req, res) => {
	res.sendFile(process.cwd() + "/public/login.html");
});

app.post("/login", (req, res) => {
	let { nombre, password } = req.body;
	let usuario = usuarios.find((usuario) => usuario.nombre == nombre);
	if (usuario) {
		let credencialesOk =
			usuario.nombre == nombre && usuario.password == password;
		if (credencialesOk) {
			usuario.contador = 0;
			const token = generateAuthToken(nombre);
			res.header("x-auth-token", token).send({
				nombre: nombre,
			});
		} else {
			res.json({ error: "error user login" });
		}
	} else {
		res.json({ error: "error user login" });
	}
});

app.get("/login-error", (req, res) => {
	res.render("login-error", {});
});

/* --------- REGISTER ---------- */
app.get("/register", (req, res) => {
	res.sendFile(process.cwd() + "/public/register.html");
});

app.post("/register", (req, res) => {
	let { nombre } = req.body;
	let usuario = usuarios.find((usuario) => usuario.nombre == nombre);
	if (!usuario) {
		let user = req.body;
		if (!user.contador) user.contador = 0;
		usuarios.push(req.body);
		const token = generateAuthToken(nombre);
		res.header("x-auth-token", token).send({
			nombre: nombre,
		});
	} else {
		res.json({ error: "error user register" });
	}
});

app.get("/register-error", (req, res) => {
	res.render("register-error", {});
});

/* --------- DATOS ---------- */

app.get("/datos", auth, (req, res) => {
	let usuario = usuarios.find((usuario) => usuario.nombre == req.user.nombre);
	if (usuario) {
		usuario.contador++;
		console.log("/datos", req.user, usuario);
		res.render("datos", {
			datos: usuario,
			contador: usuario.contador,
		});
	} else {
		res.render("user-error", {});
	}
});

app.get("/token-error", (req, res) => {
	res.render("token-error", {});
});

/* --------- LOGOUT ---------- */
app.get("/logout", (req, res) => {
	res.redirect("/");
});

/* -------------------------------------------------------- */
/* -------------------------INFO--------------------------- */
/* -------------------------------------------------------- */
app.get("/info", (req, res) => {
	let info = {
		plat: process.platform,
		ver: process.version,
		mem: JSON.stringify(process.memoryUsage(), null, "\t"),
		execPath: process.execPath,
		pid: process.pid,
		carp: process.cwd(),
		argum: JSON.stringify(process.argv, null, "\t"),
	};
	/* ----CON O SIN CONSOLE.LOG (DESAFIO 32-Artillery)-------- */
	// console.log(info);
	/* -------------------------------------------------------- */

	res.render("info", info);
});

/* -------------------------------------------------------- */

const router = express.Router();
app.use("/api", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos/listar", async (req, res) => {
	res.json(await productos.listarAll());
});

router.get("/productos/listar/:id", async (req, res) => {
	let { id } = req.params;
	res.json(await productos.listar(id));
});

router.post("/productos/guardar", async (req, res) => {
	let producto = req.body;
	console.log("post do guardar", req.body);
	await productos.guardar(producto);
	res.json(producto);
	//res.redirect('/')
});

router.put("/productos/actualizar/:id", async (req, res) => {
	let { id } = req.params;
	let producto = req.body;
	await productos.actualizar(producto, id);
	res.json(producto);
});

router.delete("/productos/borrar/:id", async (req, res) => {
	let { id } = req.params;
	let producto = await productos.borrar(id);
	res.json(producto);
});

router.get("/productos/vista", async (req, res) => {
	let prodArray = [];
	let produs = await productos.listarAll();
	prodArray.push(produs[0]);
	prodArray.push(produs[1]);

	// **************** Não funciona o each do Handlebars para o array que vem da BD, aparece a tabela na quantidade de linhas de items (e tudo OK no console), só que o VISTA no browser aparece com os campos vazios
	// res.render("vista", {
	// 	prods: prodArray,
	// });
	// **************** Assim funciona (alterar o vista.hbs tb):
	res.render("vista", {
		title: prodArray[0].title,
		price: prodArray[0].price,
		thumbnail: prodArray[0].thumbnail,
	});
});

router.get("/productos/vista-test", async (req, res) => {
	let cant = req.query.cant || 5;
	let prodArray = [];
	for (let i = 0; i < cant; i++) prodArray.push(getProdRandom(i + 1));
	res.render("vista-test", {
		productos: prodArray,
		hayProductos: prodArray.length,
	});
});

/* -------------------- Web Sockets ---------------------- */
io.on("connection", async (socket) => {
	console.log("Nuevo cliente conectado!");

	/* ------------------- */
	/* Info Productos (ws) */
	/* ------------------- */
	/* Envio los mensajes al cliente que se conectó */
	socket.emit("productos", await productos.get());

	/* Escucho los mensajes enviado por el cliente y se los propago a todos */
	socket.on("update", async (data) => {
		if ((data = "ok")) {
			io.sockets.emit("productos", await productos.get());
		}
	});

	/* ----------------------- */
	/* Centro de mensajes (ws) */
	/* ----------------------- */
	socket.emit("messages", await mensajes.getAll());

	socket.on("new-message", async function (data) {
		//console.log(data)
		await mensajes.guardar(data);
		io.sockets.emit("messages", await mensajes.getAll());
	});
});

/* --------------------------------------------------------------------------- */
/* MASTER */

if (process.argv.includes("cluster") && cluster.isMaster) {
	console.log("numCPUs: ", numCPUs);
	console.log(`Modo Cluster - PID MASTER ${process.pid}`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker) => {
		pinoWarn.warn("Worker", worker.process.pid, " died");
	});
} else {
	const server = app.listen(PORT, (err) => {
		if (!err)
			pinoInfo.info(
				`Modo Fork - Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
			);
	});
}

/* ------------------------------------------------------- */
server.on("error", (error) => console.log(`Error en servidor ${error}`));
try {
	const mongo = new MongoDB("mongodb://localhost:27017/ecommerce");
	await mongo.conectar();
	pinoWarn.warn("base MongoDB conectada");
} catch (error) {
	pinoError.error(`Error en conexión de Base de datos: ${error}`);
}
