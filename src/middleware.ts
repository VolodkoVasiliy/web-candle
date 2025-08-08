import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const cookies = getSessionCookie(request);
    if (!cookies) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
}
export const config = {
    // matcher: ["/", "/about", "/cart", "/api", "/collections", "/contact", "/product/:id", "/shop"], // Apply middleware to specific routes
    matcher: ["/((?!api|auth|_next/static|_next/image).*)"],
};