import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith('/')) {
    const storeRequestHeaders = new Headers(request.headers);

    const isProtectedRoutes = ['/account'].includes(request.nextUrl.pathname);
    const token = getCookie('allynssoapco_token', {
      req: request,
      res: response,
    });
    console.log({ token });
    if (request.nextUrl.pathname === '/login' && token)
      return NextResponse.redirect(new URL('/', request.url));
    if (request.nextUrl.pathname.includes('/register') && token)
      return NextResponse.redirect(new URL('/', request.url));
    if (isProtectedRoutes && !token)
      return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.next();
  }
  return NextResponse.next();
}
