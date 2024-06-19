import auth from '@/auth';
import { apiAuthPrefix, protectedRoutes, publicRoutes } from '@/route';
import { NextResponse } from 'next/server';

const routeHandler = (req: any) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isLoggedIn && isPublicRoute) {
        // send to protected route: /home
        const url = new URL('/home', nextUrl);
        url.searchParams.append('feedbacks', 'my');
        console.log(`Redirecting to: ${url.toString()}`);
        return Response.redirect(url.toString());
    }

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }

    return NextResponse.next();
}
//@ts-ignore
export default auth(routeHandler);

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};