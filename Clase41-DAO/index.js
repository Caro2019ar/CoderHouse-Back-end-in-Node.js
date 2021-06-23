import express from "express";
import session from "express-session";
import http from "http";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import passport from "passport";
import bCrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user.js";
import { Server as Socket } from "socket.io";
import os from "os";
import cluster from "cluster";
import { pinoInfo, pinoWarn, pinoError } from "./services/pino.js";
import productosRouter from "./routes/productos.js";
import indexRouter from "./routes/index.js";
import info from "./services/info.js";
import path from "path";
import { MongoDB } from "./db/db.js";

const __dirname = path.resolve();
const MONGO_DB_URI =
	"mongodb+srv://caro:12345699@cluster0.cwvci.mongodb.net/passport?retryWrites=true&w=majority";
const app = express();

//----------------------------------------------------------------------
// NODEMAILER y TWILIO
//----------------------------------------------------------------------
import * as ethereal from "./services/email/nodemailer-ethereal.js";
import * as gmail from "./services/email/nodemailer-gmail.js";
import * as twilio from "./services/sms/twilio.js";
//----------------------------------------------------------------------
// COMPRESIÓN
//----------------------------------------------------------------------
import compression from "compression";
app.use(compression());
//----------------------------------------------------------------------

const numCPUs = os.cpus().length;
const server = http.Server(app);
const io = new Socket(server);
const PORT = process.env.PORT || 3002;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/", indexRouter);
app.use("/api", productosRouter);
app.use("/info", info);

app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");


/* --------------------------------------------------------------------------- */
/* MASTER */

if (process.argv.includes("cluster") && cluster.isMaster) {
	pinoInfo.info(`Modo Cluster - PID MASTER ${process.pid}`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker) => {
		pinoWarn.warn("Worker", worker.process.pid, " died");
	});
} else {
	const srv = app.listen(PORT, async () => {
		console.log(
			`Modo Fork - Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
		);
	const mongo = new MongoDB(MONGO_DB_URI);
	await mongo.conectar(MONGO_DB_URI);
	});
}
