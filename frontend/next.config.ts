// Bypassing CORS issues by making all requests appear same-origin to the browser, since Next.js (port 3000) forwards them server-side to Django (port 8000).
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"], //127.0.0.1 and localhost are treated as separate origins by browsers

  // Forces Next.js to build and cache files in the fast container temp folder
  distDir: '/tmp/next-dev-cache',

  async rewrites() {
    // /api/auth/* is handled by the Route Handler at app/api/auth/[...path]/route.ts
    // which explicitly forwards Set-Cookie headers that rewrites would otherwise drop.
    return [
      {
        source: '/accounts/:path*',
        destination: 'http://localhost:8000/accounts/:path*/',
      },

      {
        source: '/personalize/api/:path*',
        destination: 'http://localhost:8000/personalize/api/:path*/',
      },


      {
        source: '/recipients/api/:path*',
        destination: 'http://localhost:8000/recipients/api/:path*/',
      },



      {
        source: '/dj-rest-auth/:path*',
        destination: 'http://localhost:8000/dj-rest-auth/:path*/',
      },
    ];
  },
};

export default nextConfig;


/*The file overall (next.config.ts) is Next.js's configuration file. 
The rewrites() block here acts as a dev proxy, forwarding two URL prefixes to Django:
/accounts/** → Django's accounts app 
/dj-rest-auth/** → Django's authentication endpoints (login, logout, token refresh, etc.)
This avoids CORS issues by making all requests appear same-origin to the browser, since Next.js (port 3000) forwards them server-side to Django (port 8000).
*/