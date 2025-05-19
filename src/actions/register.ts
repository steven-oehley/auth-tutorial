"use server";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/utils/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedData = RegisterSchema.safeParse(values);
  console.log(validatedData);
  if (!validatedData.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { name, email, password } = validatedData.data;

  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

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
