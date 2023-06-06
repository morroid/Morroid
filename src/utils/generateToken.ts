import { sign } from "jsonwebtoken";
import { JWTSign } from "../payload/JsonWebTokenPayload";
import Config from "../../enviroment";

export function generateToken(id: string, email?: string) {
  const iat = Math.floor(Date.now() / 1000);
	const algorithm = "HS256";

	return new Promise((res, rej) => {
		jwt.sign(
			{ id, iat, email },
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
