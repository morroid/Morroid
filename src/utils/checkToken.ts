<<<<<<< HEAD
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import enviroment from "../../enviroment";
import UserSchema from "../models/UserSchema";

export type UserTokenData = {
  user?: JwtPayload;
  decoded: any;
};
=======
import { JwtPayload, verify } from "jsonwebtoken";
import Config from "../../enviroment";
>>>>>>> cc502669c1e2314975edbbbe1beb2c701a7eb6ed

/**
 * check if the user's token is valid or not.
 * @param token
 * @summary if it is valid return true, if its not return false.
 */
export default async function checkToken(
  token: string
): Promise<UserTokenData | null> {
  token = token.replace("Bearer ", "");

  let decoded;

  try {
<<<<<<< HEAD
    decoded = jsonwebtoken.verify(token, enviroment.jwtSecret);
  } catch {
    console.error("[TOKEN_CHECK]: Invalid Token.");
    return null;
=======
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
>>>>>>> cc502669c1e2314975edbbbe1beb2c701a7eb6ed
  }

  if (typeof decoded == "string" || !decoded.id || !decoded.iat) {
    console.error("[TOKEN_CHECK]: Invalid Token.");
    return null;
  }

  const user = await UserSchema.findOne({
    id: decoded.id,
  });

  if (!user) {
    console.error("[TOKEN_CHECK]: Invalid Token.");
    return null;
  }

  if (
    decoded.iat * 1000 <
    new Date(user?.data?.valid_tokens_since as Date).setSeconds(0, 0)
  ) {
    console.error("[TOKEN_CHECK]: Invalid Token.");
    return null;
  }

  return { user, decoded } as UserTokenData;
}
