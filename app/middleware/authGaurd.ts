// middleware.ts
import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export const authGuard = async (req: Request, token: string | undefined) => {
  if (!token) {
    // No token found in cookies, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET) // Ensure JWT_SECRET is set
    await jwtVerify(token, secret)
    // Token is valid, proceed with the request
    return NextResponse.next()
  } catch (error) {
    console.log("error ==>", error)

    // Token is invalid or expired, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
