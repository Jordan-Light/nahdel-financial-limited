import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // Only protect the /staff route
  if (url.pathname.startsWith('/staff')) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Staff Portal"' },
      });
    }

    const auth = authHeader.split(' ')[1];
    const [user, pwd] = atob(auth).split(':');

    // USERNAME: admin | PASSWORD: your_password
    if (user === 'admin' && pwd === 'nathel8700') {
      return NextResponse.next();
    }

    return new NextResponse('Invalid Credentials', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Staff Portal"' },
    });
  }

  return NextResponse.next();
}
