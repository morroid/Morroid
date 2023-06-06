import { sign } from "jsonwebtoken";
import Config from "../../enviroment";

export function generateToken(id: string, email?: string): string {
  return sign({ id, email }, Config.jwtSecret);
}
