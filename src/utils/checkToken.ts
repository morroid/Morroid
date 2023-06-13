import { JwtPayload, verify } from "jsonwebtoken";
import Config from "../../enviroment";

/**
 *
 * @param token
 * @summary Checks if the token is valid or not.
 * @summary if it is valid return true, if its not return false.
 */
export default function checkToken(token: string): boolean {
  try {
    const decodedToken = verify(
      token,
      Config.jwtSecret
    ) ;

    const { id, email } = decodedToken;

    if (!id || !email) {
      console.error("[GATEWAY]: Token is missing essential claims");
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[GATEWAY]: Error ${err}`);
    return false;
  }
}
