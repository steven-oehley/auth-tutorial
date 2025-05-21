import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./utils/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Step 1: Validate the incoming credentials against our schema
        // This ensures the data meets our requirements before processing
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          // Step 2: Extract the validated email and password
          const { email, password } = validatedFields.data;

          // Step 3: Look up the user by email in the database
          const user = await getUserByEmail(email);

          // Step 4: If no user found or user has no password hash, authentication fails
          if (!user || !user.passwordHash) {
            return null; // Authentication failed - user not found or has no password
          }

          // Step 5: Compare the provided password with the stored hash
          // bcrypt.compare securely checks if the password matches without exposing the hash
          const passwordsMatch = await bcrypt.compare(
            password,
            user.passwordHash
          );

          // Step 6: If passwords match, return the user object to authenticate
          // Otherwise, fall through to return null (authentication failed)
          if (passwordsMatch) return user;
        }

        // Step 7: Authentication failed - invalid credentials or validation failed
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

// NextAuth configuration is split into multiple files because:
// 1. Some ORM/database libraries aren't compatible with Edge runtime
// 2. Using JWT strategy instead of database strategy for Edge compatibility
// 3. This prevents database access attempts in Edge environments like middleware

// While Auth.js strictly uses standard Web APIs (and thus can run in any environment that supports them),
// some libraries or ORMs (Object-Relational Mapping) packages that you rely on might not be ready yet.
// In this case, you can split the auth configuration into multiple files.
// Auth.js supports two session strategies. When you are using an adapter,
// it will default to the database strategy. Unless your database and its adapter is compatible with the Edge
// runtime/infrastructure, you will not be able to use the "database" session strategy.
// So for example, if you are using an adapter that relies on an ORM/library that is not yet
// compatible with Edge runtime(s) below is an example where we force the jwt strategy and split up the configuration
// so the library doesn’t attempt to access the database in edge environments, like in the middleware.

// necessary as prisma adapter is not compatible with edge runtime
