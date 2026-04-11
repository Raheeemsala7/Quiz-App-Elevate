import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {

    let pathname = req.nextUrl.pathname


    let token = req.cookies.get(process.env.NEXT_AUTH_SESSION_COOKIE_NAME!)?.value

    if (pathname === "/") {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", req.nextUrl))

        }
    }

    return NextResponse.next()
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