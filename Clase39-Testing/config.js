import dotenv from "dotenv";
import path from "path";
const __dir = path.resolve();

dotenv.config({
	path: path.join(__dir, `${process.env.NODE_ENV}.env`),
});

const entorno = {
	NODE_ENV: process.env.NODE_ENV || "development",
	MONGO_DB_URI:
		"mongodb+srv://caro:12345699@cluster0.cwvci.mongodb.net/passport?retryWrites=true&w=majority" ||
		"URI",
};
export default entorno;
