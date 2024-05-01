import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    //Routes that can be accessed while signed out
    publicRoutes: ['/'],
    // Routes that can always be accessed, and have
    // no authentication information
    ignoredRoutes: [],
});

export const config = {
    // Protects all routes, including api/trpc.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};