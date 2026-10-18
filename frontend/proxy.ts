//checks for protected routes, and if jwt cookies existence
//but does not set jwt cookie

import { NextRequest, NextResponse } from 'next/server'
// import { decrypt } from '@/app/lib/session'  //from session.ts to decrypt jwt
// import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/addressbook', '/mycards', '/personalize']
const publicRoutes = ['/', '/about', '/howitworks', '/landing', '/preview']

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => path === route || path.startsWith(route + '/'))
  const jwtToken = req.cookies.get('access')?.value  // ?, is option chaining, if value is undefined, returns null

//session cookies not used
  // 3. Decrypt the session from the cookie
  // const cookie = (await cookies()).get('session')?.value
  // const session = await decrypt(cookie)

  // 4. Redirect to /registration if the user is not authenticated
  if (isProtectedRoute && !jwtToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl))  //req.nextUrl is base URL from the request. 
  }

  // 5. Redirect to /dashboard if the user is authenticated and trying to access auth pages
  if (
    isPublicRoute &&
    jwtToken &&
    path.startsWith('/signup')
  ) {
    return NextResponse.redirect(new URL('/mycards', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}


/*Only check for existence of jwt token, not validate. If token is fake, api calls will fail as  
the rest api will reject based on faulty token.
*/