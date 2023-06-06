import { sign } from "jsonwebtoken";
import Config from "../../enviroment";

export function generateToken(id: string) {
	const algorithm = "HS256";
	return new Promise((res, rej) => {
		sign(
			{ id },
			Config.jwtSecret,
			{
				algorithm,
			},
			(err, token) => {
				if (err) return rej(err);
				return res(token);
			},
		);
	});
}
