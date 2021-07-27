import express from "express";
const router = express.Router();

/* -------------------------------------------------------- */
/* -------------------------INFO--------------------------- */
/* -------------------------------------------------------- */
router.get("/", (req, res) => {
	let info = {
		plat: process.platform,
		ver: process.version,
		mem: JSON.stringify(process.memoryUsage(), null, "\t"),
		execPath: process.execPath,
		pid: process.pid,
		carp: process.cwd(),
		argum: JSON.stringify(process.argv, null, "\t"),
	};
	/* ----CON O SIN CONSOLE.LOG (DESAFIO 32-Artillery)-------- */
	// console.log(info);
	/* -------------------------------------------------------- */

	res.render("info", info);
});

export default router;
