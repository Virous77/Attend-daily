import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/message",
  "/account",
  "/notification",
  "/settings",
  "/search",
];

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("attend");

  if (!cookie?.value && protectedRoutes.includes(req.nextUrl.pathname)) {
    const ab = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(ab.toString());
  }
}
