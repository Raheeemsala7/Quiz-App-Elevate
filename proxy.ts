import { NextRequest, NextResponse } from "next/server";


const privateRoutes = new Set([
    '/',

]);
const authRoutes = new Set([
    '/auth/login',
    '/auth/register',
]);
export default function proxy(req: NextRequest) {

    let pathname = req.nextUrl.pathname


    let token = req.cookies.get(process.env.NEXT_AUTH_SESSION_COOKIE_NAME!)?.value

    if (privateRoutes.has(pathname)) {
        if (token) {
            return NextResponse.next()
        }
        const redirectUrl = new URL('/auth/login', req.nextUrl.origin);
        redirectUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(redirectUrl)
    }

    if (authRoutes.has(pathname)) {
        if (token) {
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }

        const redirectUrl = new URL('/', req.nextUrl.origin);

        redirectUrl.searchParams.set('callbackUrl', pathname)

        return NextResponse.redirect(redirectUrl)

    }

}


export const config = {
    /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}