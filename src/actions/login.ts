"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.safeParse(values);
  if (!validatedData.success) {
    return {
      error: "Invalid email or password",
    };
  }
  return { success: "Email and password are valid!" };
};
