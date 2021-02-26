"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path = require("path"), app = express_1.default(), http = require("http").createServer(app), io = require("socket.io")(http), bodyParser = require("body-parser"), port = 8080, handlebars = require("express-handlebars");
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static("views"));
const pathRoot = path.normalize(__dirname + "/..");
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: pathRoot + "/views/",
    partialsDir: pathRoot + "/views/partials/",
}));
app.set("views", pathRoot + "/views");
app.set("view engine", "hbs");
let produtos = [];
app.get("/", (req, res) => {
    res.render("index");
});
console.log(pathRoot);
let messagesFromJSON = fs_1.default.readFileSync(pathRoot + "/messages.json", {
    encoding: "utf8",
});
let messages = JSON.parse(messagesFromJSON);
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit("messages", messages);
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages);
        fs_1.default.writeFileSync("messages.json", JSON.stringify(messages));
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
