import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
const generateAuthToken = function (nombre) {
	const token = jwt.sign({ nombre: nombre }, "myprivatekey", {
		expiresIn: "60s",
	}); //get the private key from the config file -> environment variable
	return token;
};

const auth = function (req, res, next) {
	//get the token from the header if present
	const token = req.headers["x-access-token"] || req.headers["authorization"];
	//if no token found, return response (without going to the next middelware)
	if (!token) {
		console.log(
			"if no token found, return response (without going to the next middelware)"
		);
		return res.json({
			error:
				"if no token found, return response (without going to the next middelware)",
		});
	}

	try {
		//if can verify the token, set req.user and pass to next middleware
		const decoded = jwt.verify(token, "myprivatekey");
		req.user = decoded;
		next();
	} catch (ex) {
		//if invalid token
		console.log("if invalid token");
		return res.json({ error: "if invalid token" });
	}
};
export { generateAuthToken, auth };
