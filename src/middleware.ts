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
    matcher: ["/admin", "/admin/product", "/admin/collection", "/checkout"], // Apply middleware to specific routes
    // matcher: ["/((?!api|auth|_next/static|_next/image).*)"],
};