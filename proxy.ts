import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/admin'];

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (protectedRoutes.some((route) => pathname.startsWith(route))) {
		const sessionCookies = request.cookies.get(
			'better-auth.session_token',
		)?.value;

		if (!sessionCookies) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*'],
};
