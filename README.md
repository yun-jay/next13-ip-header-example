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

## Solution

```js
// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers so that we don't modify the original headers object
  const requestHeaders = new Headers(request.headers);

  // Check if the hosting platform provides the client's IP address and store it in a variable
  const ip = request.ip || "";

  // Add the client's IP address to the request headers using the 'x-forwarded-for' field
  requestHeaders.set("x-forwarded-for", ip);

  // Return a new request object with the updated headers using NextResponse.next()
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
```

````js
// app/page.tsx

import { headers } from "next/headers";

export default function Home() {
  // Get the client's IP address from the request headers
  const ip = headers().get("x-forwarded-for");

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          IP Address:
          {` ${ip}` || " Not found"}
        </p>
        ...
      </div>
      ...
    </main>
  );
}```
````
