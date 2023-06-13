import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import enviroment from "../../enviroment";

/**
 *
 * @param token
 * @summary Checks if the token is valid or not.
 * @summary if it is valid return true, if its not return false.
 */
export default function checkToken(token: string): boolean {
  try {
    const decodedToken = jsonwebtoken.verify(
      token,
      enviroment.jwtSecret
    ) as JwtPayload;

    const { exp, iat, id } = decodedToken;
    // const currentTime = Math.floor(Date.now() / 1000);

    if (id == undefined) {
      console.error("[GATEWAY]: user_id is undefined.");
    }

    if (!exp || !iat || !id) {
      console.error("[GATEWAY]: Token is missing essential claims");
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[GATEWAY]: Error ${err}`);
    return false;
  }
}
