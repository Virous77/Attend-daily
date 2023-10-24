import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  const response = NextResponse.json({ status: 200 });

  response.cookies.delete("attend");
  return response;
}
