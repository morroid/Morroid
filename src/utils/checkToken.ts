import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import enviroment from "../../enviroment";
import UserSchema from "../models/UserSchema";

export type UserTokenData = {
  user?: JwtPayload;
  decoded: any;
};

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
    decoded = jsonwebtoken.verify(token, enviroment.jwtSecret);
  } catch {
    console.error("[TOKEN_CHECK]: Invalid Token.");
    return null;
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
