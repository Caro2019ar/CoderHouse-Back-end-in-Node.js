const { sqlite3Connect } = require("./sqlite3.db.js");
const knex = require("knex")(sqlite3Connect);

knex.schema
	.createTable("mensajeSQLite", (table) => {
		table.increments("id");
		table.string("email", 40);
		table.string("text");
		table.timestamp("created_at").defaultTo(knex.fn.now());
	})
	.then(() => console.log("table por SQLite3 created"))
	.catch((err) => console.log(err))
	.finally(() => knex.destroy());

const mensajes = [
	{ email: "pedro@gmail.com", text: "Hola, que tal?" },
	{ email: "bia@yahoo.com.br", text: "Bieeeen!" },
	{ email: "juan@gmail.com", text: "hola, chicos!" },
	{ email: "toby@gmail.com", text: "Que onda?" },
];

// ------ Insert
knex("mensajeSQLite")
	.insert(mensajes)
	.then(() => console.log("inserted successfully"))
	.catch((err) => console.log(err))
	.finally(() => knex.destroy());

// // ------- Select
// knex
// 	.select()
// 	.table("mensajeSQLite")
// 	.then((data) => console.log(data))
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

// //--- Select con WHERE:
// knex
// 	.from("mensajeSQLite")
// 	.select("*")
// 	.where("email", "=", "bia@yahoo.com.br")
// 	.then((rows) => {
// 		for (row of rows) {
// 			console.log(row.text);
// 		}
// 	})
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

// -------- Update

// knex("mensajeSQLite")
// 	.where({ email: "toby@gmail.com" })
// 	.update({ text: "Estoy estudiando muchisimooo!!" })
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

//  --------- Delete
// knex("mensajeSQLite")
// 	.where("email", "juan@gmail.com")
// 	.del()
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());
