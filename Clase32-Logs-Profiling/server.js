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

const numCPUs = os.cpus().length;
const app = express();
const server = http.Server(app);
const io = new Socket(server);

const PORT = process.env.PORT || 8080;
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

let productos = new Productos();
let mensajes = new Mensajes();

// const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
// const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const FACEBOOK_CLIENT_ID = process.argv[3] || "iiiiiiiiiiiiiii";
const FACEBOOK_CLIENT_SECRET =
	process.argv[4] || "ssssssssssssssssssssssssssssssss";
//----------------------------------------------------------------------
// COMPRESIÓN
//----------------------------------------------------------------------
import compression from "compression";
app.use(compression());
//----------------------------------------------------------------------

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
//----------------------------------------------------------------------
// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: FACEBOOK_CLIENT_ID,
// 			clientSecret: FACEBOOK_CLIENT_SECRET,
// 			callbackURL: "/auth/facebook/callback",
// 			profileFields: ["id", "displayName", "photos", "emails"],
// 			scope: ["email"],
// 		},
// 		function (accessToken, refreshToken, profile, done) {
// 			let userProfile = profile;
// 			return done(null, userProfile);
// 		}
// 	)
// );

// passport.serializeUser(function (user, cb) {
// 	cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
// 	cb(null, obj);
// });

// /* ----------------------------------------- */

// app.use(cookieParser());
// app.use(
// 	session({
// 		store: MongoStore.create({
// 			mongoUrl:
// 				"mongodb+srv://<user>:<password>@cluster0.cwvci.mongodb.net/passport?retryWrites=true&w=majority",

// 			ttl: 600,
// 		}),
// 		secret: "shhhhhhhhhhhhhhhhhhhhh",
// 		resave: false,
// 		saveUninitialized: false,
// 		rolling: true,
// 		cookie: {
// 			maxAge: 600000,
// 		},
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

//--------------------------------------------
//establecemos la configuración de handlebars
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");
//--------------------------------------------

app.use(express.static("public"));

/* -------------------------------------------------------- */
// /* -------------- LOGIN y LOGOUT DE USUARIO --------------- */
// /* -------------------------------------------------------- */
// app.use(express.urlencoded({ extended: true }));

// /* --------- LOGIN ---------- */
// app.get("/login", (req, res) => {
// 	if (req.isAuthenticated()) {
// 		res.render("home", {
// 			nombre: req.user.displayName,
// 			foto: req.user.photos[0].value,
// 			email: req.user.emails[0].value,
// 			contador: req.user.contador,
// 		});
// 	} else {
// 		res.sendFile(process.cwd() + "/public/login.html");
// 	}
// });

// app.get("/auth/facebook", passport.authenticate("facebook"));
// app.get(
// 	"/auth/facebook/callback",
// 	passport.authenticate("facebook", {
// 		successRedirect: "/home",
// 		failureRedirect: "/faillogin",
// 	})
// );

// app.get("/home", (req, res) => {
// 	console.log(req.user);
// 	res.redirect("/");
// });

// app.get("/faillogin", (req, res) => {
// 	res.render("login-error", {});
// });

// app.get("/logout", (req, res) => {
// 	let nombre = req.user.displayName;
// 	req.logout();
// 	res.render("logout", { nombre });
// });

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
	let prods = await productos.listarAll();

	res.render("vista", {
		productos: prods,
		hayProductos: prods.length,
	});
});

router.get("/productos/vista-test", async (req, res) => {
	let cant = req.query.cant || 10;
	let prods = [];
	for (let i = 0; i < cant; i++) prods.push(getProdRandom(i + 1));

	//console.log(prods)
	res.render("vista", {
		productos: prods,
		hayProductos: prods.length,
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

if (process.argv[2] === "cluster" && cluster.isMaster) {
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
