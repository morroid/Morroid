import { sign } from "jsonwebtoken";
import { JWTSign } from "../payload/JsonWebTokenPayload";
import Config from "../../enviroment";

export function generateToken(id: string): string {
  let config: JWTSign = {
    id,
  };

  return sign(config, Config.jwtSecret);
}
