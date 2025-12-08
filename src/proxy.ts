import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    // If no authorization header is present, request authentication
    if (!authHeader) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    // Parse the authorization header
    const auth = authHeader.split(" ");
    if (auth[0] !== "Basic") {
      return new NextResponse("Invalid authentication method", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    // Decode credentials
    const credentials = Buffer.from(auth[1], "base64").toString().split(":");
    const username = credentials[0];
    const password = credentials[1];

    const validUsername = env.ADMIN_USERNAME;
    const validPassword = env.ADMIN_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
