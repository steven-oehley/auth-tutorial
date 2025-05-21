"use server";

import { signOut } from "@/auth";
import { DEFAULT_NOT_LOGGED_IN_REDIRECT } from "@/routes";

export const signOutUser = async () => {
  await signOut({
    redirectTo: DEFAULT_NOT_LOGGED_IN_REDIRECT,
  });
};
