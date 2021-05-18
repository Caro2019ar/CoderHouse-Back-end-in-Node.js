// >> ***************** CLASE 23 - JSON NORMALIZACIÓN ******************
// Aspectos a incluir en el entregable:
// 1. El mensaje se envía del frontend hacia el backend, el cual lo almacenará en el base de datos.
// Luego cuando el cliente se conecte o envie un mensaje, recibirá un array de mensajes a representar en su vista.
// 2. El array debe estar normalizado con normalizr, conteniendo una entidad de autores.
// Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un id para todo el array en su conjunto (podemos asignarle nosotros un valor fijo).
// 3. El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.
// 4. Considerar que se puede cambiar el nombre del id que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo:
// En este schema cambia el nombre del id con que se normaliza el nombre de los autores a
// 'email'. Más info en la web oficial.
// 5. Presentar en el frontend (a modo de test) el porcentaje de compresión de los mensajes
// recibidos. Puede ser en el título del centro de mensajes.
// >> Nota: incluir en el frontend el script de normalizr de la siguiente cdn: https://cdn.jsdelivr.net/npm/normalizr@3.6.1/dist/normalizr.browser.min.js
// Así podremos utilizar los mismos métodos de normalizr que en el backend. Por ejemplo: new normalizr.schema.Entity , normalizr.denormalize(...,...,...)

// *-------------------------------------

const { normalize, schema, denormalize } = require("normalizr");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const modulo = require("./service/message.serv.js");
const maneja = modulo.Maneja;
const mess = new maneja();

const mongoose = require("mongoose");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let normalizedMess = "";
let objeto = "";
const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const textoSchema = new schema.Entity("text");

//Acá estoy creando un ID fijo 123 para el post:
const mensajeSchema = new schema.Entity(
	"post",
	{
		author: authorSchema,
	},
	{ idAttribute: (value) => 123 }
);

//--- Hacer 1o. un POST en http://localhost:3000/msg:
app.post("/msg", (req, res) => {
	objeto = {
		author: {
			id: req.body.author.id,
			nombre: req.body.author.nombre,
			apellido: req.body.author.apellido,
			edad: req.body.author.edad,
			alias: req.body.author.alias,
			avatar: req.body.author.avatar,
		},
		text: req.body.text,
	};
	let mensagem = mess.guardar(objeto);
	normalizedMess = normalize(objeto, mensajeSchema);
	console.log("Normalizado :", JSON.stringify(normalizedMess).length);
	res.send(normalizedMess);
});
//--- Después hacer el GET en POSTMAN:
app.get("/msg", (req, res) => {
	let msg = denormalize(
		normalizedMess.result,
		mensajeSchema,
		normalizedMess.entities
	);
	console.log("Denormalizado: ", JSON.stringify(msg).length);
	res.send(msg);
});
app.listen(3000, () => {
	console.log(`Conexión al puerto 3000`);
});

// Mongo ya crea un ID para el array:
connectMongo();
async function connectMongo() {
	try {
		const URL = "mongodb://localhost:27017/ecommerce";
		let rta = await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log("Base de datos con mongoose");
	} catch (err) {
		console.log(err);
	}
}
