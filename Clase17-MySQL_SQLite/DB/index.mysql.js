const { options } = require("./mysql.db.js");
const knex = require("knex")(options);

knex.schema
	.createTable("tablaProductos", (table) => {
		table.increments("id");
		table.string("nombre", 40);
		table.decimal("precio");
		table.integer("timestamp");
		table.string("descripcion");
		table.string("codigo");
		table.string("foto");
		table.integer("stock");
	})
	.then(() => console.log("table created"))
	.catch((err) => console.log(err))
	.finally(() => knex.destroy());

const productosInserir = [
	{
		nombre: "Calculadora",
		precio: "98.80",
		foto:
			"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",
		descripcion: "calculadora HP12C",
		codigo: "9282",
		stock: "34",
	},
	{
		nombre: "Pantalones",
		precio: "1399.99",
		foto:
			"https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		descripcion: "Pantalones jeans",
		codigo: "8768667",
		stock: "2",
	},
];

//------- Insert
knex("tablaProductos")
	.insert(productosInserir)
	.then(() => console.log("inserted successfully"))
	.catch((err) => console.log(err))
	.finally(() => knex.destroy());

// --------- Select
// knex
// 	.select()
// 	.table("tablaProductos")
// 	.then((data) => console.log(data))
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

// ------ Update

// knex("tablaProductos")
// 	.where({ nombre: "Calculadora" })
// 	.update({ stock: 1 })
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

// --------- Delete
// knex("tablaProductos")
// 	.where("id", ">", "1")
// 	.del()
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());
