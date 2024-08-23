import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: ['/sign-up', '/'],
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
