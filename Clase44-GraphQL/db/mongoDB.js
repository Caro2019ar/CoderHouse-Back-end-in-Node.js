import mongoose from "mongoose";

export class MongoDB {
	static instancia
	constructor(URL) {
		if(!MongoDB.instancia){
		this.URL = URL;

		process.on("exit", () => {
			this.close();
		});
		} else {
			return MongoDB.instancia
		}
	}

	async conectar(URL) {
		try {
			await mongoose.connect(this.URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("MongoDB conectada");
		} catch (err) {
			console.log(`MongoDB: Error en conectar: ${err}`);
			throw err;
		}
	}
	close() {
		console.log("Cerrando conexión MongoDB!");
	}
}
