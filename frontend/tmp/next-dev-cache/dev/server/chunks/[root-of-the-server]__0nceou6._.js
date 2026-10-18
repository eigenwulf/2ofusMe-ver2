module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/auth/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
// Route Handler proxy for all /api/auth/* requests to Django.
//
// Key problem solved here:
// dj-rest-auth's /registration/ endpoint returns access+refresh in the JSON body
// but does NOT set them as cookies (unlike the /login/ endpoint which does).
// This handler detects that case and manually sets the cookies so the Next.js
// middleware (proxy.ts) can read the 'access' cookie to protect routes.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const DJANGO_BASE = 'http://localhost:8000';
// Matches dj-rest-auth JWT cookie settings in Django settings.py
const ACCESS_COOKIE = 'access';
const REFRESH_COOKIE = 'refresh';
const COOKIE_PATH = '/';
const ACCESS_MAX_AGE = 60 * 60; // 1 hour (match SIMPLE_JWT ACCESS_TOKEN_LIFETIME)
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (match SIMPLE_JWT REFRESH_TOKEN_LIFETIME)
async function proxy(req, params) {
    const djangoUrl = `${DJANGO_BASE}/api/auth/${params.path.join('/')}/`;
    const isRegistration = params.path.join('/') === 'registration';
    const reqHeaders = new Headers(req.headers);
    reqHeaders.delete('host');
    // Buffer the body so it can be read once and forwarded
    const bodyText = req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined;
    const upstreamRes = await fetch(djangoUrl, {
        method: req.method,
        headers: reqHeaders,
        body: bodyText
    });
    // Copy all upstream response headers
    const resHeaders = new Headers();
    upstreamRes.headers.forEach((value, key)=>{
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
                resHeaders.append('Set-Cookie', `${ACCESS_COOKIE}=${json.access}; Path=${COOKIE_PATH}; Max-Age=${ACCESS_MAX_AGE}; HttpOnly; SameSite=Lax`);
            }
            if (json.refresh) {
                resHeaders.append('Set-Cookie', `${REFRESH_COOKIE}=${json.refresh}; Path=${COOKIE_PATH}; Max-Age=${REFRESH_MAX_AGE}; HttpOnly; SameSite=Lax`);
            }
        } catch  {
        // JSON parse failed — pass through unmodified
        }
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](resBody, {
        status: upstreamRes.status,
        headers: resHeaders
    });
}
async function GET(req, { params }) {
    return proxy(req, await params);
}
async function POST(req, { params }) {
    return proxy(req, await params);
}
async function PUT(req, { params }) {
    return proxy(req, await params);
}
async function PATCH(req, { params }) {
    return proxy(req, await params);
}
async function DELETE(req, { params }) {
    return proxy(req, await params);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0nceou6._.js.map