import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const { data, error } = await supabase.auth.getSession();

  if ((isProtectedRoute && !data.session?.access_token) || error) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    data.session?.access_token &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return res;
}
