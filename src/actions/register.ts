"use server";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/utils/user";
import { hashPassword } from "@/utils/hash";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedData = RegisterSchema.safeParse(values);
  console.log(validatedData);
  if (!validatedData.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { name, email, password } = validatedData.data;

  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });

  //   !TODO: Send email verification token email

  // could rather use toActionState and useActionState here for this
  return { success: "User created successfully!" };
};
