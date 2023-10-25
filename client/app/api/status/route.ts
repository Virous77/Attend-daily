import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("attend");

  if (!cookie?.value) {
    return NextResponse.json({ status: false, token: null });
  }

  const response = NextResponse.json({ status: true, token: cookie });

  return response;
}
