// An array of routes that are public and do not require authentication
export const publicRoutes = ["/"];

// An array of routes that are used for authentication
// These routes will redirect users to /settings
export const authRoutes = ["/auth/login", "/auth/register"];

// special case for the auth route
// make sure to never block
// routes that start with /api/auth are used for api authentication purposes
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";

export const DEFAULT_NOT_LOGGED_IN_REDIRECT = "/auth/login";
