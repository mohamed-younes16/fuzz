import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (request.nextUrl.pathname === "/signin" && token) {
    // Redirect authenticated users away from the sign-in page
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && request.nextUrl.pathname !== "/signin") {
    // Redirect unauthenticated users to the sign-in page
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|assets|api).*)", 
    "/signin",
  ],
};