"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path"),
    app = (0, _express2.default)(),
    http = require("http").createServer(app),
    io = require("socket.io")(http),
    bodyParser = require("body-parser"),
    port = 8080,
    handlebars = require("express-handlebars");
var pathRoot = path.normalize(__dirname + "/..");
app.use(_express2.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(_express2.default.static("views"));
app.engine("hbs", handlebars({
	extname: ".hbs",
	defaultLayout: "index.hbs",
	layoutsDir: pathRoot + "/views/",
	partialsDir: pathRoot + "/views/partials/"
}));
app.set("views", pathRoot + "/views");
app.set("view engine", "hbs");

var produtos = [];

app.get("/", function (req, res) {
	res.render("index");
});

var messagesFromJSON = _fs2.default.readFileSync(pathRoot + "/messages.json", {
	encoding: "utf8"
});
var messages = JSON.parse(messagesFromJSON);

io.on("connection", function (socket) {
	console.log("Nuevo cliente conectado");
	socket.emit("messages", messages);
	socket.on("new-message", function (data) {
		messages.push(data);
		io.sockets.emit("messages", messages);
		_fs2.default.writeFileSync("messages.json", JSON.stringify(messages));
	});
	socket.emit("produtos", produtos);
	socket.on("new-produto", function (produto) {
		produtos.push(produto);
		io.sockets.emit("produtos", produtos);
	});
});

http.listen(port, function () {
	console.log("Conexi\xF3n al puerto " + port);
});
