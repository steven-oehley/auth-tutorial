"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<{ error?: string; success?: string }> => {
  const validatedData = LoginSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { email, password } = validatedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    // Note: This will likely never be reached because signIn redirects on success
    return { success: "Logged in successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An unknown error occurred" };
      }
    }
    // Need to throw error back to the client
    // Otherwise we will not be redirected
    throw error;
  }
};
