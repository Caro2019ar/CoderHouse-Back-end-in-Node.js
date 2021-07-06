import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "callie.muller@ethereal.email",
		pass: "h3M6CQm8Nj6Yvu6gGe",
	},
});

export const enviarMail = (asunto, mensaje, cb) => {
	const mailOptions = {
		from: "Servidor Node.js",
		to: "callie.muller@ethereal.email",
		subject: asunto,
		html: mensaje,
	};

	transporter.sendMail(mailOptions, (err, info) => {
		/*
        if(err) {
            console.log(err)
            //return err
        }
        else console.log(info)
        */
		cb(err, info);
	});
};
