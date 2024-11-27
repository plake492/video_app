// middleware.ts
import { NextResponse } from "next/server"
import { cookies } from "next/headers" // Use cookies from next/headers
import { authGuard } from "@/middleware/authGaurd"
import { loginSignupGuard } from "@/middleware/loginSignupGaurd"

export async function middleware(req: Request) {
  const cookieStore = await cookies() // Retrieve cookies from the incoming request
  const token = cookieStore.get("token")?.value // Get the 'token' cookie value
  const url = new URL(req.url)

  if (url.pathname.startsWith("/dashboard")) {
    return authGuard(req, token)
  }

  if (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup")) {
    return loginSignupGuard(req, token)
  }

  return NextResponse.next()
}

// Configuration for the middleware: apply it to specific routes
export const config = {
  matcher: ["/dashboard", "/login", "/signup"], // Add routes to protect
}
