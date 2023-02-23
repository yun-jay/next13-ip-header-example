This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```js
// middleware.ts
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
```

```js
// app/page.tsx
export default function Home() {
  const ip = headers().get("x-forwarded-for");

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          IP Address:
          <code>{` ${ip}` || " Not found"}</code>
        </p>
        ...
      </div>
      ...
    </main>
  );
}
```
