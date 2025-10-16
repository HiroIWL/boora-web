import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;
    const { pathname } = req.nextUrl;
    const publicRoutes = [
        '/login',
        '/register',
        '/select-user',
        '/_next',
        '/favicon.ico',
        '/public',
        '/static',
        '/api',
    ];

    const isPublicPath =
        pathname === '/' ||
        publicRoutes.some((route) => pathname.startsWith(route));

    if (isPublicPath && !token) {
        return NextResponse.next();
    }

    if (
        token &&
        (pathname === '/' || pathname === '/login' || pathname === '/register')
    ) {
        return NextResponse.redirect(new URL('/desafios', req.url));
    }

    if (!token) {
        console.log(isPublicPath, pathname);
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname === '/desafios') {
        const redirectUrl = new URL('/desafios/lista', req.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
