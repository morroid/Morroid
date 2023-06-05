import bcrypt from "bcrypt";

export async function comparePassword(
  data: string,
  encrypted: string
): Promise<boolean> {
  return await bcrypt.compare(data, encrypted);
}
