import express from "express";
import fs from "fs";
const path = require("path"),
	app = express(),
	http = require("http").createServer(app),
	io = require("socket.io")(http),
	bodyParser = require("body-parser"),
	port = 8080,
	handlebars = require("express-handlebars");
const pathRoot = path.normalize(__dirname + "/..");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
		layoutsDir: pathRoot + "/views/",
		partialsDir: pathRoot + "/views/partials/",
	})
);
app.set("views", pathRoot + "/views");
app.set("view engine", "hbs");

let produtos = [];

app.get("/", (req, res) => {
	res.render("index");
});

let messagesFromJSON = fs.readFileSync(pathRoot + "/messages.json", {
	encoding: "utf8",
});
let messages = JSON.parse(messagesFromJSON);

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	socket.emit("messages", messages);
	socket.on("new-message", function (data) {
		messages.push(data);
		io.sockets.emit("messages", messages);
		fs.writeFileSync("messages.json", JSON.stringify(messages));
	});
	socket.emit("produtos", produtos);
	socket.on("new-produto", function (produto) {
		produtos.push(produto);
		io.sockets.emit("produtos", produtos);
	});
});

http.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
