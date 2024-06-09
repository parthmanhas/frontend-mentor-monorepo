import auth from '@/auth';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, protectedRoutes, publicRoutes } from '@/route';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isLoggedIn && isPublicRoute) {
        // send to protected route: /home
        return Response.redirect(new URL('/home', nextUrl));
    }

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }

    return null;
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};