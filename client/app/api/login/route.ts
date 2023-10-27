import { NextRequest, NextResponse } from "next/server";

type TBody = {
  token: string;
};

export async function POST(request: NextRequest, res: NextResponse) {
  const body: TBody = await request.json();

  const response = NextResponse.json({ status: 200 });

  response.cookies.set({
    name: "attend",
    value: body.token,
    httpOnly: true,
    maxAge: 3600 * 24 * 7,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
  return response;
}
