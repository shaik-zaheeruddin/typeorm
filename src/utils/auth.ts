import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const JWT_SECRET = "sdjnsdkj skd "; // Replace with your actual JWT secret

interface Payload {
  id: string;
  email: string;
}

export function generateToken(payload: Payload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "6d" });
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
