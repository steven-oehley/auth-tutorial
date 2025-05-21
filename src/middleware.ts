import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_NOT_LOGGED_IN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  // This function is called on every request to the auth route
  // You can add custom logic here if needed
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // order of the if statements is important

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    // If the user is already logged in, redirect to the default login redirect
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // If the user is not logged in and the route is not public, redirect to the login page
    return Response.redirect(new URL(DEFAULT_NOT_LOGGED_IN_REDIRECT, nextUrl));
  }
});

export const config = {
  // Matcher is used to specify which paths the middleware should run on
  // Matcher can also exclude certain paths
  // Says on which paths the auth middleware should run

  // ? The below matcher is from clerk docs
  // ? https://clerk.com/docs/references/nextjs/clerk-middleware
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
