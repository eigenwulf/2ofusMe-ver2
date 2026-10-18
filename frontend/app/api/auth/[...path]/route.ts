// Route Handler proxy for all /api/auth/* requests to Django.
//
// Key problem solved here:
// dj-rest-auth's /registration/ endpoint returns access+refresh in the JSON body
// but does NOT set them as cookies (unlike the /login/ endpoint which does).
// This handler detects that case and manually sets the cookies so the Next.js
// middleware (proxy.ts) can read the 'access' cookie to protect routes.

import { NextRequest, NextResponse } from 'next/server';

const DJANGO_BASE = 'http://localhost:8000';

// Matches dj-rest-auth JWT cookie settings in Django settings.py
const ACCESS_COOKIE = 'access';
const REFRESH_COOKIE = 'refresh';
const COOKIE_PATH = '/';
const ACCESS_MAX_AGE = 60 * 60;          // 1 hour (match SIMPLE_JWT ACCESS_TOKEN_LIFETIME)
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (match SIMPLE_JWT REFRESH_TOKEN_LIFETIME)

async function proxy(req: NextRequest, params: { path: string[] }) {
  const djangoUrl = `${DJANGO_BASE}/api/auth/${params.path.join('/')}/`;
  const isRegistration = params.path.join('/') === 'registration';

  const reqHeaders = new Headers(req.headers);
  reqHeaders.delete('host');

  // Buffer the body so it can be read once and forwarded
  const bodyText = req.method !== 'GET' && req.method !== 'HEAD'
    ? await req.text()
    : undefined;

  const upstreamRes = await fetch(djangoUrl, {
    method: req.method,
    headers: reqHeaders,
    body: bodyText,
  });

  // Copy all upstream response headers
  const resHeaders = new Headers();
  upstreamRes.headers.forEach((value, key) => {
    resHeaders.append(key, value);
  });

  // Clone the response body so we can both read it and forward it
  const resBody = await upstreamRes.text();

  // For registration: dj-rest-auth puts tokens in JSON body, not cookies.
  // Manually promote them to cookies so proxy.ts middleware can see them.
  if (isRegistration && upstreamRes.status === 201) {
    try {
      const json = JSON.parse(resBody);
      if (json.access) {
        resHeaders.append(
          'Set-Cookie',
          `${ACCESS_COOKIE}=${json.access}; Path=${COOKIE_PATH}; Max-Age=${ACCESS_MAX_AGE}; HttpOnly; SameSite=Lax`
        );
      }
      if (json.refresh) {
        resHeaders.append(
          'Set-Cookie',
          `${REFRESH_COOKIE}=${json.refresh}; Path=${COOKIE_PATH}; Max-Age=${REFRESH_MAX_AGE}; HttpOnly; SameSite=Lax`
        );
      }
    } catch {
      // JSON parse failed — pass through unmodified
    }
  }

  return new NextResponse(resBody, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}
export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}
export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}
