// middleware.ts
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers" // Use cookies from next/headers

export async function middleware(req: Request) {
  const cookieStore = await cookies() // Retrieve cookies from the incoming request
  const token = cookieStore.get("token")?.value // Get the 'token' cookie value

  if (!token) {
    // No token found in cookies, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    // Verify the JWT token using the secret (ensure the secret is the same used during login)
    jwt.verify(token as string, process.env.JWT_SECRET as string)
    // Token is valid, proceed with the request
    return NextResponse.next()
  } catch (error) {
    // Token is invalid or expired, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

// Configuration for the middleware: apply it to specific routes
export const config = {
  matcher: ["/dashboard/*", "/profile/*", "/api/protected/*"], // Add routes to protect
}
