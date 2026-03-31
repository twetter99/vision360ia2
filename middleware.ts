import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  response.cookies.delete('lang');

  return response;
}

export const config = {
  matcher: '/:path*',
};
