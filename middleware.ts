import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })
    const { pathname } = req.nextUrl
    console.log(pathname)

    if (token) {
        if (token.appVersion !== (process.env.NEXT_PUBLIC_APP_VERSION)) {

            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = "/signin"
            redirectUrl.searchParams.set("callback", pathname)
            redirectUrl.searchParams.set("reason", "version_mismatch") // Optional: to show message
            
            const response = NextResponse.redirect(redirectUrl)
            
            // Clear NextAuth cookies
            response.cookies.delete("next-auth.session-token")
            response.cookies.delete("__Secure-next-auth.session-token")
            response.cookies.delete("next-auth.csrf-token")
            response.cookies.delete("__Host-next-auth.csrf-token")
            
            return response

        }
        if (pathname.startsWith("/signin")) {
            console.log("adasdasda")
            return NextResponse.redirect("https://cadthatout.vercel.app/pre-built-shop")
        }
        if(pathname.startsWith("/admin") && token.role !== "ADMIN" ) {
            return NextResponse.redirect("https://cadthatout.vercel.app/pre-built-shop")
        }
       
        return NextResponse.next()
    }

    if (pathname.startsWith("/logout")) {
        return NextResponse.redirect("https://cadthatout.vercel.app")
    }

    if (!token && pathname.startsWith("/signin")) {
        return NextResponse.next()
    }

    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/signin"
    redirectUrl.searchParams.set("callback", pathname)
    return NextResponse.redirect(redirectUrl)



}

export const config = {
    matcher: ["/signin","/admin","/request-custom", "/pre-built-shop"]
}