const accountSid = "AC3e0778b40af182f8cf96704c4efe17ed";
const authToken = "fbcc751fe5d3ec7b0fc99c940992d73d";

import twilio from "twilio";

const client = twilio(accountSid, authToken);

export const enviarSMS = async (mensaje, numero) => {
	try {
		let rta = await client.messages.create({
			body: mensaje,
			from: "+12182204899",
			to: numero,
		});
		return rta;
	} catch (error) {
		return error;
	}
};
