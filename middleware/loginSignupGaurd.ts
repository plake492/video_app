import { NextResponse } from "next/server"

export const loginSignupGuard = async (
  req: Request,
  token: string | undefined,
) => {
  if (token) {
    // No token found in cookies, redirect to the previous page
    const referer = req.headers.get("referer") || "/"

    return NextResponse.redirect(new URL(referer, req.url))
  }

  return NextResponse.next()
}
