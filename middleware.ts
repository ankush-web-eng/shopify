import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from './app/api/auth/[...nextauth]/options';
import { getToken } from 'next-auth/jwt';
// export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/items/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*','/product','/cart'],
};

export default async function middleware(request: NextRequest) {


    const token = await getToken({ req: request });
    const email = token?.email;
    const url = request.nextUrl;


    if (
        token &&
        (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') )
    ) {
        return NextResponse.redirect(new URL('/items', request.url));
    }

    if (token && email !== process.env.ADMIN_EMAIL && url.pathname.startsWith('/product')) {
        return NextResponse.redirect(new URL('/items', request.url));
    }

    if (
        !token &&
           url.pathname.startsWith('/cart') || url.pathname.startsWith('/product')) { 
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}