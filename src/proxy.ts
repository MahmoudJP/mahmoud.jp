import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const allowedEmail = process.env.STUDIO_ALLOWED_EMAIL?.trim().toLowerCase();
  const authorized = Boolean(allowedEmail && token?.email?.trim().toLowerCase() === allowedEmail);

  if (authorized) return NextResponse.next();

  const loginUrl = new URL("/studio/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/studio", "/studio/dashboard/:path*", "/studio/mind-map/:path*"],
};
