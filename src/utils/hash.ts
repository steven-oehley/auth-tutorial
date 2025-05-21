import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  // Generate a salt with a cost factor of 10 (you can adjust this)
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
