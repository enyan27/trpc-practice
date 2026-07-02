import { getSessionCookie } from "better-auth/cookies";

export function proxy(req: Request) {
  const hasSession = getSessionCookie(req);
  if (!hasSession) return Response.redirect(new URL("/sign-in", req.url));
}

export const config = { matcher: ["/", "/workflows/:path*"] };
