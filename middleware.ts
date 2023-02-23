import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // 'request.ip' has the IP address of the `Request`, if provided by your hosting platform
  const ip = request.ip || "";

  // Add new request headers
  requestHeaders.set("x-forwarded-for", ip);

  // You can also set request headers in NextResponse.rewrite
  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
}
