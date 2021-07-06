import express from "express";
import session from "express-session";
import http from "http";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import passport from "passport";
import bCrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { user } from "./models/model.js";
import { Server as Socket } from "socket.io";
import os from "os";
import cluster from "cluster";
import { pinoInfo, pinoWarn, pinoError } from "./services/pino.js";
import productosRouter from "./routes/productos.js";
import indexRouter from "./routes/index.js";
import info from "./services/info.js";
import path from "path";
import { MongoDB } from "./db/mongoDB.js";
import config from "./config.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const __dirname = path.resolve();
const app = express();

const argv = yargs(hideBin(process.argv)).argv;
argv.port ? false : (argv.port = 8080);

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
	const srv = app.listen(argv.port, async () => {
		console.log(
			`Modo Fork - Servidor express escuchando en el puerto ${argv.port} - PID WORKER ${process.pid} - Entorno: ${config.NODE_ENV}`
		);
		const mongo = new MongoDB(config.MONGO_DB_URI);
		await mongo.conectar(config.MONGO_DB_URI);
	});
}
