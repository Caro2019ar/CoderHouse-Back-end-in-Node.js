import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import passport from "passport";
import bCrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

import { User } from "./models/user.js";

const MONGO_DB_URI =
	"mongodb+srv://caro:12345699@cluster0.cwvci.mongodb.net/passport?retryWrites=true&w=majority";

const app = express();

app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: MONGO_DB_URI,
			ttl: 600,
		}),
		secret: "sh",
		resave: false,
		saveUninitialized: false,
		rolling: false,
		cookie: {
			maxAge: 600000,
		},
	})
);

app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	"login",
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		(req, username, password, cb) => {
			User.findOne({ username: username }, (err, user) => {
				if (err) return done(err);
				if (!user) {
					console.log("User Not Found with username " + username);
					return cb(null, false);
				}
				if (!validatePassword(user, password)) {
					console.log("Invalid Password");
					return cb(null, false);
				}
				return cb(null, user);
			});
		}
	)
);

const validatePassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

passport.use(
	"register",
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		function (req, username, password, cb) {
			const findOrCreateUser = function () {
				User.findOne({ username: username }, function (err, user) {
					if (err) {
						console.log("Error in SignUp: " + err);
						return cb(err);
					}
					if (user) {
						console.log("User already exists");
						return cb(null, false);
					} else {
						var newUser = new User();
						newUser.username = username;
						newUser.password = createHash(password);
						newUser.save((err) => {
							if (err) {
								console.log("Error in Saving user: " + err);
								throw err;
							}
							console.log("User Registration succesful");
							return cb(null, newUser);
						});
					}
				});
			};
			process.nextTick(findOrCreateUser);
		}
	)
);

var createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
// Pela serialização se guarda o id da sessão:
passport.serializeUser((user, done) => {
	done(null, user._id);
});

// Pela desserialização de Passport a partir do id se obtem o usuário
passport.deserializeUser((id, done) => {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

app.get("/ses", (req, res) => {
	console.log(req.session);
	res.send("anda a mirar la consola");
});

app.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/faillogin" }),
	(req, res) => {
		res.redirect("/");
	}
);

app.get("/faillogin", (req, res) => {
	res.render("login-error", {});
});


app.get("/register", (req, res) => {
	res.render("register");
});

app.post(
	"/register",
	passport.authenticate("register", { failureRedirect: "/failregister" }),
	(req, res) => {
		res.redirect("/");
	}
);

app.get("/failregister", (req, res) => {
	res.render("register-error", {});
});

// Logout é uma função de passport para limpar a sessão. Este req.user.username é criado pelo passport quando serializa o usuário
app.get("/logout", (req, res) => {
	const { username } = req.user;
	req.logout();
	res.render("logout", { username });
});

app.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/");
	} else {
		res.render("login");
	}
});
// Pelo req.user.username não se devolve só o ID, mas todo o usuário:
app.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("home", { username: req.user.username });
	} else {
		res.redirect("login");
	}
});

const PORT = process.env.PORT || 3000;
const srv = app.listen(PORT, async () => {
	console.log(`Servidor http escuchando en el puerto ${srv.address().port}`);
	try {
		const mongo = await mongoose.connect(MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected DB");
	} catch (error) {
		console.log(`Error en conexión de Base de datos: ${error}`);
	}
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
