const sqlite3Connect = {
	client: "sqlite3",
	connection: {
		filename: "./mensajeSQLite.sqlite",
	},
	useNullAsDefault: true,
};

module.exports = {
	sqlite3Connect,
};
