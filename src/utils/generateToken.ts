import { sign } from "jsonwebtoken";
import { JWTSign } from "../payload/JsonWebTokenPayload";
import Config from "../../enviroment";

/**
 *
 * @param email example@morroid.dev
 * @param password password@morroid.dev
 * @returns eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImV4YW1wbGVAbW9ycm9pZC5kZXYiLCJwYXNzd29yZCI6InBhc3N3b3JkQG1vcnJvaWQuZGV2In0.1qAsS4wlhtXv0TFWO4MNqSjQjB_79-hSIxAEzLBiIlk
 */
export function generateToken(
  // not the best way to do this.
  email: string | any,
  password: string | any
): string {
  let config: JWTSign = {
    email,
    password,
  };

  return sign(config, Config.jwtSecret);
}
